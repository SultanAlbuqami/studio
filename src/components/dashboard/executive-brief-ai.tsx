"use client";

import { useState, useCallback } from 'react';
import {
  generateExecutiveBrief,
  type BriefBullet,
  type Recommendation,
  type ExecutiveBriefResult,
} from '@/ai/flows/ai-powered-executive-briefing';
import {
  acceptanceControlMetrics,
  acceptanceLeadershipNote,
  accountRiskProfiles,
  dashboardData,
} from '@/app/lib/dashboard-data';
import {
  Loader2,
  TriangleAlert,
  AlertCircle,
  ShieldAlert,
  Info,
  ArrowRight,
  Target,
  User,
  FileText,
  RefreshCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

type ExecutiveBriefAIProps = Readonly<{
  isAiConfigured: boolean;
  compact?: boolean;
}>;

// ── Static fallback content ──

const staticBriefBullets: BriefBullet[] = [
  {
    title: 'OTD Trending Below Target',
    detail:
      'On-Time Delivery at 89.2%, 0.8pp below threshold — driven by equipment lead times in Managed Security and civil works delays.',
    severity: 'warning',
  },
  {
    title: '12.4M SAR Revenue Exposed',
    detail:
      `B2B Fiber accounts for 36% of revenue at risk. ${accountRiskProfiles[0]?.accountName} and ${accountRiskProfiles[1]?.accountName} remain the highest visible exposure points in the live queue.`,
    severity: 'critical',
  },
  {
    title: '72 Orders Past Due',
    detail:
      'Backlog pressure concentrated in Civil Works (47 overdue) and Equipment Install (31 overdue) stages.',
    severity: 'warning',
  },
  {
    title: '184 Items Pending Acceptance',
    detail:
      `${acceptanceControlMetrics.overdueItems} acceptance items are already overdue. ${acceptanceLeadershipNote.summary}`,
    severity: 'warning',
  },
  {
    title: 'Execution Velocity Improving',
    detail:
      'Weekly deliveries trending up (162 vs 155 target in Week 39). B2B Fiber execution speed improving.',
    severity: 'info',
  },
];

const staticRecommendations: Recommendation[] = [
  {
    title: 'Stabilize MoI Secure VPN Recovery',
    rationale:
      `${accountRiskProfiles[0]?.accountName} remains exposed on service continuity and SLA pressure. Recovery ownership needs tighter control before customer attention escalates again.`,
    priority: 'critical',
    owner: accountRiskProfiles[0]?.owner ?? 'Enterprise Service Operations',
    impact: 'Protect ministry continuity commitments and avoid a live SLA-breach escalation.',
  },
  {
    title: 'Clear Strategic Acceptance Queue',
    rationale:
      `${acceptanceControlMetrics.overdueItems} overdue acceptance items still threaten quarter-end recognition. ${acceptanceLeadershipNote.summary}`,
    priority: 'critical',
    owner: acceptanceLeadershipNote.owner,
    impact: acceptanceLeadershipNote.impact,
  },
  {
    title: 'Deploy Emergency Resources to NEOM Zone C',
    rationale:
      'Weather disruption stalling civil works. 2.8M SAR at risk with backbone fiber at 20% progress.',
    priority: 'high',
    owner: 'Field Engineering',
    impact: 'Recover delivery timeline and reduce exposure by 2.8M SAR.',
  },
  {
    title: 'Activate Dammam B2C Task Force',
    rationale:
      'B2C fulfillment backlog growing in Eastern region with technician shortage reported.',
    priority: 'high',
    owner: 'Regional Operations',
    impact: 'Reduce backlog and restore installation SLA compliance.',
  },
  {
    title: 'Expedite Cisco Hardware for Red Sea Global',
    rationale:
      `${accountRiskProfiles[2]?.riskReason}. Supply chain escalation is still needed before the Western-region closeout window moves again.`,
    priority: 'medium',
    owner: accountRiskProfiles[2]?.owner ?? 'Supply Chain',
    impact: 'Unblock equipment install phase for Phase 1 delivery.',
  },
];

// ── Severity + Priority styling ──

const severityConfig = {
  critical: {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/8',
    border: 'border-red-500/20',
    dot: 'bg-red-400',
  },
  warning: {
    icon: ShieldAlert,
    color: 'text-amber-400',
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/20',
    dot: 'bg-amber-400',
  },
  info: {
    icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/20',
    dot: 'bg-blue-400',
  },
};

const priorityConfig = {
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/25' },
  high: { label: 'High', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/25' },
  medium: { label: 'Medium', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25' },
};

// ── Sub-components ──

function BriefBulletItem({
  bullet,
  compact = false,
}: Readonly<{ bullet: BriefBullet; compact?: boolean }>) {
  const config = severityConfig[bullet.severity];
  return (
    <div
      className={`flex gap-3 rounded-lg ${compact ? 'p-2.5' : 'p-3'} ${config.bg} border ${config.border}`}
    >
      <div className={`mt-0.5 shrink-0 ${config.color}`}>
        <config.icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0">
        <p className={`${compact ? 'text-[12px]' : 'text-[13px]'} font-semibold text-foreground leading-tight`}>
          {bullet.title}
        </p>
        <p className={`${compact ? 'text-[11px]' : 'text-[12px]'} text-muted-foreground leading-relaxed mt-1`}>
          {bullet.detail}
        </p>
      </div>
    </div>
  );
}

function RecommendationCard({
  rec,
  compact = false,
}: Readonly<{ rec: Recommendation; compact?: boolean }>) {
  const pConfig = priorityConfig[rec.priority];
  return (
    <div
      className={`rounded-lg border border-border/40 bg-card/50 ${compact ? 'p-2.5 space-y-1.5' : 'p-3 space-y-2'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 min-w-0">
          <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0" />
          <p className={`${compact ? 'text-[12px]' : 'text-[13px]'} font-semibold text-foreground leading-tight`}>
            {rec.title}
          </p>
        </div>
        <span
          className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded border ${pConfig.bg} ${pConfig.border} ${pConfig.color}`}
        >
          {pConfig.label}
        </span>
      </div>
      <p className={`${compact ? 'line-clamp-2 text-[11px]' : 'text-[12px]'} text-muted-foreground leading-relaxed pl-5`}>
        {rec.rationale}
      </p>
      <div className={`flex ${compact ? 'flex-wrap gap-2' : 'items-center gap-4'} pl-5 pt-0.5`}>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70">
          <User className="h-3 w-3" />
          <span>{rec.owner}</span>
        </div>
        <div className={`flex items-center gap-1.5 text-[11px] text-muted-foreground/70 ${compact ? 'min-w-0' : ''}`}>
          <Target className="h-3 w-3" />
          <span className={compact ? 'line-clamp-1' : ''}>{rec.impact}</span>
        </div>
      </div>
    </div>
  );
}

function SkeletonPulse() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-border/20 p-3 space-y-2">
          <div className="h-3.5 bg-muted animate-pulse rounded w-3/5" />
          <div className="h-3 bg-muted/60 animate-pulse rounded w-full" />
          <div className="h-3 bg-muted/40 animate-pulse rounded w-2/5" />
        </div>
      ))}
    </div>
  );
}

// ── Main Component ──

export function ExecutiveBriefAI({
  isAiConfigured,
  compact = false,
}: ExecutiveBriefAIProps) {
  const [result, setResult] = useState<ExecutiveBriefResult | null>(null);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBrief = useCallback(async () => {
    if (!isAiConfigured) {
      setFallbackMessage(
        'Configure GEMINI_API_KEY or GOOGLE_API_KEY in your environment to enable live brief refresh.'
      );
      return;
    }

    setLoading(true);
    setFallbackMessage(null);
    setResult(null);

    try {
      const res = await generateExecutiveBrief(dashboardData);

      if (res.status === 'success') {
        setResult(res);
      } else {
        setFallbackMessage(res.message);
      }
    } catch {
      setFallbackMessage(
        'Live brief refresh could not be completed. The dashboard remains fully operational.'
      );
    } finally {
      setLoading(false);
    }
  }, [isAiConfigured]);

  const briefBullets = result?.briefBullets ?? staticBriefBullets;
  const recommendations = result?.recommendations ?? staticRecommendations;
  const visibleBriefBullets = compact ? briefBullets.slice(0, 3) : briefBullets;
  const visibleRecommendations = compact
    ? recommendations.slice(0, 2)
    : recommendations;
  const hiddenBriefCount = briefBullets.length - visibleBriefBullets.length;
  const hiddenRecommendationCount =
    recommendations.length - visibleRecommendations.length;
  const showContent = !loading;

  return (
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      {/* ── Executive Brief ── */}
      <Card className="executive-card overflow-hidden">
        <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-border/30">
          <div className="flex items-start gap-2.5">
            <FileText className="mt-0.5 h-3.5 w-3.5 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">Operating Brief</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/60">
                {compact
                  ? 'Key signals from current operating snapshot.'
                  : 'Current executive note grounded in the approved portfolio and delivery snapshot.'}
              </p>
            </div>
          </div>
          {isAiConfigured && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={fetchBrief}
                  disabled={loading}
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs gap-1.5 text-muted-foreground/50 hover:text-foreground"
                >
                  {loading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <RefreshCcw className="h-3 w-3" />
                  )}
                  {loading ? 'Refreshing…' : 'Refresh brief'}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[240px] text-xs leading-relaxed">
                Refresh the operating brief using the latest approved dashboard context.
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <CardContent className={compact ? 'p-2.5' : 'p-3'}>
          {loading && <SkeletonPulse />}
          {!loading && showContent && (
            <div className="space-y-2">
              {visibleBriefBullets.map((bullet) => (
                <BriefBulletItem
                  key={bullet.title}
                  bullet={bullet}
                  compact={compact}
                />
              ))}
            </div>
          )}

          {compact && hiddenBriefCount > 0 && !loading && (
            <p className="mt-2 text-[10px] text-muted-foreground/55">
              Showing top {visibleBriefBullets.length} of {briefBullets.length}{' '}
              brief signals.
            </p>
          )}

          {fallbackMessage && !loading && (
            <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/20">
              <TriangleAlert className="mt-0.5 h-3 w-3 text-muted-foreground/40 shrink-0" />
              <p className="text-[11px] text-muted-foreground/50">
                Live brief refresh unavailable. Showing the current approved operating note.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Recommended Actions ── */}
      <Card className="executive-card overflow-hidden">
        <div className="flex items-start justify-between px-4 py-3 border-b border-border/30">
          <div className="flex items-start gap-2.5">
            <Target className="mt-0.5 h-3.5 w-3.5 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">Recommended Actions</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/60">
                {compact
                  ? 'Requires owner assignment before execution.'
                  : 'Prioritized actions requiring owner decision and assignment.'}
              </p>
            </div>
          </div>
        </div>

        <CardContent className={compact ? 'p-2.5' : 'p-3'}>
          {loading && <SkeletonPulse />}
          {!loading && showContent && (
            <div className="space-y-2">
              {visibleRecommendations.map((rec) => (
                <RecommendationCard
                  key={rec.title}
                  rec={rec}
                  compact={compact}
                />
              ))}
            </div>
          )}

          {compact && hiddenRecommendationCount > 0 && !loading && (
            <p className="mt-2 text-[10px] text-muted-foreground/55">
              Showing top {visibleRecommendations.length} of{' '}
              {recommendations.length} recommended actions.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
