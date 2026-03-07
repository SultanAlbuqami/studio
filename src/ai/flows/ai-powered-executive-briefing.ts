'use server';
/**
 * @fileOverview A Genkit flow for generating a concise executive brief based on dashboard data.
 *
 * - generateExecutiveBrief - A function that synthesizes key dashboard data into an executive brief.
 * - AiPoweredExecutiveBriefingInput - The input type for the generateExecutiveBrief function.
 * - AiPoweredExecutiveBriefingOutput - The return type for the generateExecutiveBrief function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredExecutiveBriefingInputSchema = z.object({
  ordersInFlight: z.number().describe('The current number of orders in flight.'),
  onTimeDeliveryPercentage: z
    .number()
    .describe('The percentage of orders delivered on time.'),
  acceptedValueMTD: z
    .number()
    .describe('The monetary value of accepted deliveries Month-To-Date (MTD).'),
  revenueAtRisk: z
    .number()
    .describe('The total revenue identified as being at risk.'),
  acceptancePending: z.number().describe('The number of items pending acceptance.'),
  pastDueBacklog: z.number().describe('The number of items in the backlog that are past due.'),
  weeklyExecutionTrendDescription:
    z.string().describe('A concise summary of the weekly execution trend.'),
  portfolioStatusDistributionDescription:
    z.string().describe('A concise summary of the portfolio status distribution (e.g., "60% on track, 20% at risk, 20% delayed").'),
  revenueAtRiskByFamily: z
    .array(
      z.object({
        family: z.string().describe('The family or segment.'),
        revenue: z.number().describe('The revenue at risk for this family.'),
      })
    )
    .describe('A list of revenue at risk by different product families or segments.'),
  topAtRiskAccounts: z
    .array(
      z.object({
        accountName: z.string().describe('The name of the account.'),
        riskReason: z
          .string()
          .describe('The primary reason for the account being at risk.'),
        revenueImpact: z
          .number()
          .describe('The potential revenue impact from this account.'),
      })
    )
    .describe('A list of top accounts identified as at risk.'),
  immediateInterventionQueue: z
    .array(z.string())
    .describe('A list of immediate items or situations requiring executive intervention.'),
});
export type AiPoweredExecutiveBriefingInput = z.infer<
  typeof AiPoweredExecutiveBriefingInputSchema
>;

const AiPoweredExecutiveBriefingOutputSchema = z.object({
  executiveBrief: z
    .string()
    .describe(
      'A concise executive brief synthesizing key dashboard data into delivery status, risks, and intervention needs.'
    ),
});
export type AiPoweredExecutiveBriefingOutput = z.infer<
  typeof AiPoweredExecutiveBriefingOutputSchema
>;

export async function generateExecutiveBrief(
  input: AiPoweredExecutiveBriefingInput
): Promise<AiPoweredExecutiveBriefingOutput> {
  return aiPoweredExecutiveBriefingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'executiveBriefingPrompt',
  input: {schema: AiPoweredExecutiveBriefingInputSchema},
  output: {schema: AiPoweredExecutiveBriefingOutputSchema},
  prompt:
    'You are an executive assistant preparing a concise, high-priority brief for a Director Customer PMO at a telecom/business services company in Saudi Arabia.\n  Your goal is to synthesize the provided dashboard data into a summary that allows understanding of current delivery status, identified risks, and immediate intervention needs in under 2 minutes. Focus on actionable insights and critical highlights.\n\n  Dashboard Data:\n\n  **Key Performance Indicators (KPIs):**\n  - Orders in Flight: {{{ordersInFlight}}}\n  - On-time Delivery Percentage: {{{onTimeDeliveryPercentage}}}%\n  - Accepted Value MTD: {{{acceptedValueMTD}}} SAR\n  - Revenue at Risk: {{{revenueAtRisk}}} SAR\n  - Acceptance Pending: {{{acceptancePending}}} items\n  - Past Due Backlog: {{{pastDueBacklog}}} items\n\n  **Portfolio Health:**\n  - Weekly Execution Trend: {{{weeklyExecutionTrendDescription}}}\n  - Portfolio Status Distribution: {{{portfolioStatusDistributionDescription}}}\n\n  **Revenue at Risk by Family:**\n  {{#if revenueAtRiskByFamily}}\n  {{#each revenueAtRiskByFamily}}\n  - {{family}}: {{revenue}} SAR\n  {{/each}}\n  {{else}}\n  No specific revenue at risk by family reported.\n  {{/if}}\n\n  **Top At-Risk Accounts:**\n  {{#if topAtRiskAccounts}}\n  {{#each topAtRiskAccounts}}\n  - Account: {{accountName}}, Reason: {{riskReason}}, Impact: {{revenueImpact}} SAR\n  {{/each}}\n  {{else}}\n  No top at-risk accounts identified.\n  {{/if}}\n\n  **Immediate Intervention Queue:**\n  {{#if immediateInterventionQueue}}\n  {{#each immediateInterventionQueue}}\n  - {{{this}}}\n  {{/each}}\n  {{else}}\n  No immediate interventions required.\n  {{/if}}\n\n  Based on the above data, provide a concise executive brief. Structure it clearly with sections for \'Current Status\', \'Key Risks\', and \'Intervention Priorities\'. The tone should be serious, credible, and enterprise-grade.\n  ',
});

const aiPoweredExecutiveBriefingFlow = ai.defineFlow(
  {
    name: 'aiPoweredExecutiveBriefingFlow',
    inputSchema: AiPoweredExecutiveBriefingInputSchema,
    outputSchema: AiPoweredExecutiveBriefingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
