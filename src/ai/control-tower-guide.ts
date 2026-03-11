import 'server-only';

import { accountRiskProfiles, dashboardData, dataAsOf, escalationSummary } from '@/app/lib/dashboard-data';
import { hasConfiguredAiKey } from '@/ai/config';
import { getOpenAIClient } from '@/ai/openai';
import {
  controlTowerGuideName,
  getGuideNextRoute,
  getGuideRouteSummary,
  guideRouteSummaries,
} from '@/lib/control-tower-guide-content';

export type GuideChatMessage = Readonly<{
  role: 'user' | 'assistant';
  content: string;
}>;

type GuideReplyResult =
  | {
      status: 'success';
      message: string;
    }
  | {
      status: 'unavailable';
      message: string;
    };

const GUIDE_MODEL = 'gpt-4o-mini';
const MISSING_KEY_MESSAGE =
  'Live AI chat is unavailable because OPENAI_API_KEY is not configured on the server.';
const FAILURE_MESSAGE =
  'The guide could not generate a live reply just now. Please try again.';

function sanitizeMessages(messages: GuideChatMessage[]): GuideChatMessage[] {
  return messages
    .filter(
      (message): message is GuideChatMessage =>
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0,
    )
    .slice(-8)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 1600),
    }));
}

function buildGuideSystemPrompt(pathname: string): string {
  const currentRoute = getGuideRouteSummary(pathname);
  const nextRoute = getGuideNextRoute(pathname);
  const routeSummary = guideRouteSummaries
    .map(
      (route) =>
        `- ${route.title} (${route.url}): ${route.purpose} Proof point: ${route.proof}`,
    )
    .join('\n');
  const topRiskAccounts = accountRiskProfiles
    .slice(0, 4)
    .map(
      (account) =>
        `- ${account.accountName}: ${account.riskReason} (${(
          account.revenueImpact / 1_000_000
        ).toFixed(1)}M SAR exposure)`,
    )
    .join('\n');

  return `You are ${controlTowerGuideName}, an embedded assistant inside "Salam PMO Control Tower".

Mission:
- Help visitors understand what this project is, why it matters, and how to navigate it confidently.
- Act like a sharp executive guide, not a generic chatbot.
- Recommend the next best route when it materially helps the visitor.

Truth constraints:
- Use only the project context below. Do not invent integrations, customers, or live data that are not described here.
- If asked about authenticity, state clearly that the operating data is illustrative / simulated for an executive interview demonstration, while the product thinking, KPI governance model, UX structure, and execution approach are intended to be production-grade.
- If asked who built the product, say it was designed and built by Sultan Albuqami.

Style rules:
- Match the user’s language. If the language is unclear, default to English.
- Keep default answers concise, concrete, and presentation-ready.
- Prefer short paragraphs or flat bullets when listing steps.
- When appropriate, end with: "Next best view: <Route Title> (<route>)".
- Stay helpful, confident, and specific.

Project context:
- Product name: Salam PMO Control Tower
- Positioning: executive PMO / customer delivery control tower for a telecom operating environment
- Data timestamp shown in product: ${dataAsOf}
- Current route: ${currentRoute.title} (${currentRoute.url})
- Recommended next route from here: ${nextRoute.title} (${nextRoute.url})
- Top-line KPIs: ${dashboardData.ordersInFlight.toLocaleString()} orders in flight, ${dashboardData.onTimeDeliveryPercentage}% on-time delivery, ${(dashboardData.acceptedValueMTD / 1_000_000).toFixed(1)}M SAR accepted value MTD, ${(dashboardData.revenueAtRisk / 1_000_000).toFixed(1)}M SAR revenue at risk, ${dashboardData.acceptancePending} pending acceptance items, ${dashboardData.pastDueBacklog} past-due backlog
- Escalation posture: ${escalationSummary.openEscalations} open escalations, ${escalationSummary.criticalCount} critical, average MTTR ${escalationSummary.avgMttr}

Primary routes:
${routeSummary}

Highest visible risk accounts:
${topRiskAccounts}`;
}

export async function generateGuideReply(
  pathname: string,
  messages: GuideChatMessage[],
): Promise<GuideReplyResult> {
  if (!hasConfiguredAiKey()) {
    return {
      status: 'unavailable',
      message: MISSING_KEY_MESSAGE,
    };
  }

  try {
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: GUIDE_MODEL,
      temperature: 0.4,
      max_tokens: 700,
      messages: [
        {
          role: 'system',
          content: buildGuideSystemPrompt(pathname),
        },
        ...sanitizeMessages(messages).map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) {
      return {
        status: 'unavailable',
        message: FAILURE_MESSAGE,
      };
    }

    return {
      status: 'success',
      message: content,
    };
  } catch (error) {
    console.error('Control tower guide failed:', error);
    return {
      status: 'unavailable',
      message: FAILURE_MESSAGE,
    };
  }
}
