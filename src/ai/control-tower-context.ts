import {
  accountRiskProfiles,
  dataAsOf,
  dataConfidenceLedger,
  dataConfidenceSignals,
  dashboardData,
  deliveryExceptions,
  escalationData,
  escalationSummary,
  executiveActionRegister,
  executiveDecisionQueue,
  executiveScenarios,
  strategicDecisionQueue,
} from '@/app/lib/dashboard-data';
import {
  salamOfficialSources,
  salamServiceSegments,
} from '@/app/lib/salam-service-portfolio';
import { kpiMetadata } from '@/app/lib/kpi-metadata';
import {
  getGuideNextRoute,
  getGuideRouteSummary,
  guideRouteSummaries,
} from '@/lib/control-tower-guide-content';

function formatSarMillions(value: number) {
  return `${(value / 1_000_000).toFixed(1)}M SAR`;
}

export function buildControlTowerKnowledgeBase(pathname: string): string {
  const currentRoute = getGuideRouteSummary(pathname);
  const nextRoute = getGuideNextRoute(pathname);

  const routeCatalog = guideRouteSummaries
    .map(
      (route) =>
        `- ${route.title} (${route.url}): ${route.purpose} Leadership question: ${route.leadershipQuestion.en}`,
    )
    .join('\n');

  const decisionQueue = executiveDecisionQueue
    .map(
      (item) =>
        `- ${item.title} [${item.priority.toUpperCase()} | ${item.region} | ${item.decisionWindow}] Owner: ${item.owner}. Decision: ${item.decision}. Impact: ${item.impact}. Evidence: ${item.evidence.join('; ')}. Forum: ${item.reviewForum}.`,
    )
    .join('\n');

  const actionRegister = executiveActionRegister
    .map(
      (item) =>
        `- ${item.title} [${item.status}] Owner: ${item.owner}. Due: ${item.dueLabel}. Linked KPI: ${item.linkedKpi}. Outcome: ${item.outcome}. Forum: ${item.forum}. Evidence: ${item.evidence}.`,
    )
    .join('\n');

  const scenarios = executiveScenarios
    .map((scenario) => {
      const effects = scenario.effects
        .map((effect) => `${effect.label}: ${effect.current} -> ${effect.projected}${effect.unit ?? ''}`)
        .join('; ');

      return `- ${scenario.title}: ${scenario.summary} Owner: ${scenario.owner}. Decision window: ${scenario.decisionWindow}. Confidence: ${scenario.confidence}. Effects: ${effects}. Why it matters: ${scenario.outcome}`;
    })
    .join('\n');

  const deliveryQueue = deliveryExceptions
    .slice(0, 5)
    .map(
      (item) =>
        `- ${item.title} (${item.account}) [${item.region} | ${item.stage}] Owner: ${item.owner}. Decision window: ${item.decisionWindow}. Decision: ${item.decision}. Impact: ${item.impact}.`,
    )
    .join('\n');

  const strategicQueue = strategicDecisionQueue
    .slice(0, 5)
    .map(
      (item) =>
        `- ${item.orderId} ${item.account} (${item.service}) [${item.status} | ${item.region}] Owner: ${item.owner}. Window: ${item.decisionWindow}. Decision: ${item.decision}. Impact: ${item.impact}.`,
    )
    .join('\n');

  const escalationQueue = escalationData
    .map(
      (item) =>
        `- ${item.id} [${item.severity}] ${item.subject}. Status: ${item.status}. Owner: ${item.owner}. Decision window: ${item.decisionWindow}. Impact: ${item.impact}.`,
    )
    .join('\n');

  const riskAccounts = accountRiskProfiles
    .map(
      (item) =>
        `- ${item.accountName}: ${item.riskReason} (${formatSarMillions(item.revenueImpact)} exposure). Owner: ${item.owner}. Region: ${item.region}.`,
    )
    .join('\n');

  const governanceCatalog = Object.values(kpiMetadata)
    .map(
      (kpi) =>
        `- ${kpi.label}: source ${kpi.source}; owner ${kpi.owner}; forum ${kpi.forum}; threshold ${kpi.threshold}.`,
    )
    .join('\n');

  const confidenceLedger = dataConfidenceLedger
    .map((item) => `- ${item.label}: ${item.value}`)
    .join('\n');

  const confidenceSignals = dataConfidenceSignals
    .map((item) => `- ${item.label}: ${item.value}. ${item.detail}`)
    .join('\n');

  const servicePortfolio = salamServiceSegments
    .map((segment) => {
      const categories = segment.categories
        .map((category) => category.name)
        .join(', ');

      return `- ${segment.title}: ${segment.overview} Categories: ${categories}. Control-tower lens: ${segment.controlTowerLens}`;
    })
    .join('\n');

  const officialSourceLibrary = salamOfficialSources
    .map((source) => `- ${source.label}: ${source.url}. ${source.note}`)
    .join('\n');

  return `Control Tower knowledge base

Current route:
- ${currentRoute.title} (${currentRoute.url})
- Purpose: ${currentRoute.purpose}
- Leadership question: ${currentRoute.leadershipQuestion.en}
- Best next route: ${nextRoute.title} (${nextRoute.url})

Global dashboard snapshot:
- Snapshot timestamp: ${dataAsOf}
- Orders in flight: ${dashboardData.ordersInFlight.toLocaleString()}
- On-time delivery: ${dashboardData.onTimeDeliveryPercentage}%
- Accepted value MTD: ${formatSarMillions(dashboardData.acceptedValueMTD)}
- Revenue at risk: ${formatSarMillions(dashboardData.revenueAtRisk)}
- Acceptance pending: ${dashboardData.acceptancePending}
- Past-due backlog: ${dashboardData.pastDueBacklog}
- Portfolio status distribution: ${dashboardData.portfolioStatusDistributionDescription}
- Weekly execution trend: ${dashboardData.weeklyExecutionTrendDescription}
- Escalation posture: ${escalationSummary.openEscalations} open escalations, ${escalationSummary.criticalCount} critical, average MTTR ${escalationSummary.avgMttr}, SLA breach risk ${escalationSummary.slaBreachRisk}

Routes:
${routeCatalog}

Official Salam service portfolio:
${servicePortfolio}

Official source library:
${officialSourceLibrary}

Executive decision queue:
${decisionQueue}

Executive action register:
${actionRegister}

Scenario planner:
${scenarios}

Top at-risk accounts:
${riskAccounts}

Delivery decision queue:
${deliveryQueue}

Strategic decision queue:
${strategicQueue}

Escalation queue:
${escalationQueue}

Data confidence ledger:
${confidenceLedger}

Data confidence signals:
${confidenceSignals}

KPI governance catalog:
${governanceCatalog}`;
}
