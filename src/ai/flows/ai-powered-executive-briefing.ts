'use server';

import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import { getAiClient } from '@/ai/client';
import { getAiModel, hasConfiguredAiKey } from '@/ai/config';

// ── Types ──

export interface DashboardInput {
  ordersInFlight: number;
  onTimeDeliveryPercentage: number;
  acceptedValueMTD: number;
  revenueAtRisk: number;
  acceptancePending: number;
  pastDueBacklog: number;
  weeklyExecutionTrendDescription: string;
  portfolioStatusDistributionDescription: string;
  revenueAtRiskByFamily: Array<{ family: string; revenue: number }>;
  topAtRiskAccounts: Array<{
    accountName: string;
    riskReason: string;
    revenueImpact: number;
  }>;
  immediateInterventionQueue: string[];
  activeEscalations?: Array<{
    id: string;
    severity: string;
    subject: string;
    impact: string;
  }>;
}

export interface BriefBullet {
  title: string;
  detail: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface Recommendation {
  title: string;
  rationale: string;
  priority: 'critical' | 'high' | 'medium';
  owner: string;
  impact: string;
}

export interface ExecutiveBriefResult {
  status: 'success';
  briefBullets: BriefBullet[];
  recommendations: Recommendation[];
}

export interface ExecutiveBriefUnavailable {
  status: 'unavailable';
  message: string;
}

export type ExecutiveBriefGenerationResult =
  | ExecutiveBriefResult
  | ExecutiveBriefUnavailable;

const briefBulletSchema = z.object({
  title: z.string().min(3),
  detail: z.string().min(10),
  severity: z.enum(['critical', 'warning', 'info']),
});

const recommendationSchema = z.object({
  title: z.string().min(3),
  rationale: z.string().min(10),
  priority: z.enum(['critical', 'high', 'medium']),
  owner: z.string().min(2),
  impact: z.string().min(10),
});

const executiveBriefSchema = z.object({
  briefBullets: z.array(briefBulletSchema).min(3).max(5),
  recommendations: z.array(recommendationSchema).min(3).max(5),
});

// ── Messages ──

const MISSING_KEY_MSG =
  'AI analysis requires a Gemini API key. Configure GEMINI_API_KEY or GOOGLE_API_KEY in your environment.';
const UNAVAILABLE_MSG =
  'AI analysis could not be completed. Verify your Gemini API key, quota, and billing details and try again.';

function getUnavailableMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    Number(error.status) === 429
  ) {
    return 'AI analysis is temporarily unavailable because the Gemini API quota is exhausted. Showing the approved operating brief instead.';
  }

  return UNAVAILABLE_MSG;
}

// ── Prompt ──

function buildSystemPrompt(): string {
  return `You are a senior operations analyst preparing an executive intelligence brief for a Director Customer PMO at a telecom / business-services company in Saudi Arabia.

Your output MUST be valid JSON matching this exact schema:
{
  "briefBullets": [
    { "title": "string", "detail": "string", "severity": "critical|warning|info" }
  ],
  "recommendations": [
    { "title": "string", "rationale": "string", "priority": "critical|high|medium", "owner": "string", "impact": "string" }
  ]
}

Rules for briefBullets (3-5 items):
- Each bullet summarizes one key operational signal from the data
- "title" is a short headline (5-8 words)
- "detail" is one sentence explaining the signal and its business implication
- "severity" reflects urgency: critical = needs immediate action, warning = needs attention this week, info = positive signal or context
- Cover: delivery performance, revenue exposure, backlog/acceptance pressure, escalation risk
- Be specific — reference actual numbers, accounts, and service families from the data

Rules for recommendations (3-5 items):
- Each recommendation is a concrete, actionable executive directive
- "title" is a clear action statement (5-10 words)
- "rationale" explains why this matters based on the data (one sentence)
- "priority" is critical/high/medium
- "owner" is the functional role or team that should own this (e.g., "Delivery Lead", "Account Team", "VP Operations")
- "impact" is the expected business outcome if acted on (one sentence)
- Focus on: overdue orders, acceptance bottlenecks, SLA/escalation risk, revenue protection, account intervention, resource constraints

Tone: serious, executive, boardroom-ready. No filler. No generic recommendations. Every item must be grounded in the provided data.
Output ONLY the JSON object. No markdown, no code fences, no explanation.`;
}

function buildUserPrompt(input: DashboardInput): string {
  const revenueByFamily = input.revenueAtRiskByFamily
    .map((r) => `  - ${r.family}: ${(r.revenue / 1_000_000).toFixed(1)}M SAR`)
    .join('\n');

  const atRiskAccounts = input.topAtRiskAccounts
    .map(
      (a) =>
        `  - ${a.accountName}: ${a.riskReason} (${(a.revenueImpact / 1_000_000).toFixed(1)}M SAR impact)`
    )
    .join('\n');

  const interventions = input.immediateInterventionQueue
    .map((i) => `  - ${i}`)
    .join('\n');

  const escalationBlock = input.activeEscalations?.length
    ? `\nActive Escalations:\n${input.activeEscalations
        .map((e) => `  - [${e.severity}] ${e.subject} — ${e.impact}`)
        .join('\n')}`
    : '';

  return `Current Dashboard Snapshot:

KPIs:
  - Orders in Flight: ${input.ordersInFlight.toLocaleString()}
  - On-Time Delivery: ${input.onTimeDeliveryPercentage}%
  - Accepted Value MTD: ${(input.acceptedValueMTD / 1_000_000).toFixed(1)}M SAR
  - Revenue at Risk: ${(input.revenueAtRisk / 1_000_000).toFixed(1)}M SAR
  - Acceptance Pending: ${input.acceptancePending} items
  - Past Due Backlog: ${input.pastDueBacklog} items

Execution Trend: ${input.weeklyExecutionTrendDescription}
Portfolio Distribution: ${input.portfolioStatusDistributionDescription}

Revenue at Risk by Service Family:
${revenueByFamily}

Top At-Risk Accounts:
${atRiskAccounts}

Immediate Intervention Queue:
${interventions}${escalationBlock}`;
}

// ── Core Function ──

function parseExecutiveBriefPayload(content: string): ExecutiveBriefResult {
  const parsedJson = JSON.parse(content) as unknown;
  const parsed = executiveBriefSchema.parse(parsedJson);

  return {
    status: 'success',
    briefBullets: parsed.briefBullets,
    recommendations: parsed.recommendations,
  };
}

async function generateExecutiveBriefUncached(
  input: DashboardInput,
  model: string,
): Promise<ExecutiveBriefResult> {
  const client = getAiClient();
  const response = await client.chat.completions.create({
    model,
    temperature: 0.3,
    max_tokens: 1500,
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserPrompt(input) },
    ],
  });

  const content = response.choices[0]?.message?.content;
  const textContent = typeof content === 'string' ? content.trim() : '';

  if (!textContent) {
    throw new Error('AI executive brief response was empty.');
  }

  return parseExecutiveBriefPayload(textContent);
}

const generateExecutiveBriefCached = unstable_cache(
  async (
    serializedInput: string,
    model: string,
  ): Promise<ExecutiveBriefResult> => {
    const input = JSON.parse(serializedInput) as DashboardInput;
    return generateExecutiveBriefUncached(input, model);
  },
  ['executive-brief'],
  { revalidate: 60 * 30 },
);

export async function generateExecutiveBrief(
  input: DashboardInput,
): Promise<ExecutiveBriefGenerationResult> {
  if (!hasConfiguredAiKey()) {
    return { status: 'unavailable', message: MISSING_KEY_MSG };
  }

  try {
    const model = getAiModel();
    const serializedInput = JSON.stringify(input);
    return await generateExecutiveBriefCached(serializedInput, model);
  } catch (error) {
    console.error('Executive brief generation failed:', error);
    return { status: 'unavailable', message: getUnavailableMessage(error) };
  }
}
