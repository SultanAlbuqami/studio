import 'server-only';

import { hasConfiguredAiKey } from '@/ai/config';
import { getOpenAIClient } from '@/ai/openai';
import { buildControlTowerKnowledgeBase } from '@/ai/control-tower-context';
import {
  buildGuidePlaybookReply,
  controlTowerGuideName,
  guideRouteSummaries,
  getGuideNextRoute,
  getGuideRouteSummary,
  shouldPreferPlaybookReply,
} from '@/lib/control-tower-guide-content';

export type GuideChatMessage = Readonly<{
  role: 'user' | 'assistant';
  content: string;
}>;

type GuideReplyResult =
  {
    status: 'success';
    message: string;
    mode: 'ai' | 'playbook';
  };

const GUIDE_MODEL = 'gpt-4o-mini';
let guideLiveReplyHealth: 'unknown' | 'healthy' | 'invalid' = 'unknown';

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
  const knowledgeBase = buildControlTowerKnowledgeBase(pathname);

  return `You are ${controlTowerGuideName}, an embedded assistant inside "Salam PMO Control Tower".

Mission:
- Answer questions about the dashboard, KPIs, owners, scenarios, risk accounts, governance, and how to present the product.
- Act like a sharp executive analyst and PMO chief-of-staff, not a generic chatbot.
- Recommend the next best route only when it materially helps the user.

Truth constraints:
- Use only the project context below. Do not invent integrations, customers, metrics, customers, or live data that are not described here.
- When the user asks for a number, owner, route, or decision, answer with the exact value from context if it exists.
- If the answer is not in context, say that clearly and do not guess.
- If asked about authenticity, state clearly that the operating data is illustrative / simulated for an executive interview demonstration, while the product thinking, KPI governance model, UX structure, and execution approach are intended to be production-grade.
- If asked who built the product, say it was designed and built by Sultan Albuqami.
- If asked whether AI designed the dashboard, explain that the dashboard structure, KPI model, governance, narrative, and implementation were designed and built by Sultan Albuqami; AI is used only in bounded features such as brief refresh and dashboard Q&A.

Style rules:
- Match the user’s language. If the language is unclear, default to English.
- Keep default answers concise, concrete, and presentation-ready.
- Prefer short paragraphs or flat bullets when listing steps.
- For dashboard questions, answer in an executive way: signal -> implication -> owner or action.
- For presentation coaching, give crisp talk-track language rather than technical implementation detail unless asked.
- When appropriate, end with: "Next best view: <Route Title> (<route>)".
- Stay helpful, confident, and specific.

Project context:
- Product name: Salam PMO Control Tower
- Positioning: executive PMO / customer delivery control tower for a telecom operating environment
- Current route: ${currentRoute.title} (${currentRoute.url})
- Recommended next route from here: ${nextRoute.title} (${nextRoute.url})
- Primary routes:
${routeSummary}

Detailed knowledge base:
${knowledgeBase}`;
}

export async function generateGuideReply(
  pathname: string,
  messages: GuideChatMessage[],
): Promise<GuideReplyResult> {
  const sanitizedMessages = sanitizeMessages(messages);
  const latestUserPrompt =
    [...sanitizedMessages]
      .reverse()
      .find((message) => message.role === 'user')
      ?.content ?? '';
  const playbookReply = buildGuidePlaybookReply(pathname, latestUserPrompt);

  if (
    !hasConfiguredAiKey() ||
    guideLiveReplyHealth === 'invalid' ||
    shouldPreferPlaybookReply(latestUserPrompt)
  ) {
    return {
      status: 'success',
      mode: 'playbook',
      message: playbookReply,
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
        ...sanitizedMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    });

    const content = response.choices[0]?.message?.content?.trim();
    if (!content) {
      return {
        status: 'success',
        mode: 'playbook',
        message: playbookReply,
      };
    }

    guideLiveReplyHealth = 'healthy';

    return {
      status: 'success',
      mode: 'ai',
      message: content,
    };
  } catch (error) {
    console.error('Control tower guide failed:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      Number(error.status) === 401
    ) {
      guideLiveReplyHealth = 'invalid';
    }

    return {
      status: 'success',
      mode: 'playbook',
      message: playbookReply,
    };
  }
}
