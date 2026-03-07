import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { escalationData, escalationSummary, mttrBySeverity } from '@/app/lib/dashboard-data';
import {
  applyQueueFilters,
  getQueueFilterOptions,
  resolveQueueFilters,
} from '@/app/lib/queue-filters';
import {
  escalationGovernanceKeys,
  kpiMetadata,
} from '@/app/lib/kpi-metadata';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  ShieldAlert,
  Target,
  Timer,
  User,
} from 'lucide-react';
import { QueueFilters } from '@/components/dashboard/queue-filters';

const severityStyles: Record<string, string> = {
  Critical: 'bg-destructive',
  High: 'bg-orange-500',
  Medium: 'bg-chart-4',
};

const severityOrder: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
};

type EscalationsPageProps = {
  searchParams?: Promise<{
    owner?: string | string[];
    region?: string | string[];
    window?: string | string[];
  }>;
};

export default async function EscalationsPage({
  searchParams,
}: EscalationsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeFilters = resolveQueueFilters(resolvedSearchParams);
  const filteredEscalations = applyQueueFilters(escalationData, activeFilters);
  const filterOptions = getQueueFilterOptions(escalationData);
  const sortedEscalations = [...filteredEscalations].sort(
    (a, b) =>
      (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9),
  );

  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="Escalations & Recovery" subtitle="Risk Management" />

      {/* Summary KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label={kpiMetadata.openEscalations.label}
          value={escalationSummary.openEscalations}
          icon={AlertTriangle}
          trend={{ value: escalationSummary.weekOverWeekTrend, positive: false }}
          variant="compact"
          className="border-destructive/15"
        />
        <KpiCard
          label={kpiMetadata.criticalEscalations.label}
          value={escalationSummary.criticalCount}
          icon={AlertTriangle}
          variant="compact"
          className="border-destructive/25"
        />
        <KpiCard
          label={kpiMetadata.avgMttr.label}
          value={escalationSummary.avgMttr}
          icon={Timer}
          variant="compact"
        />
        <KpiCard
          label={kpiMetadata.slaBreachRisk.label}
          value={escalationSummary.slaBreachRisk}
          icon={ShieldAlert}
          variant="compact"
          className="border-rose-500/15"
        />
      </section>

      {/* MTTR by Severity */}
      <Card className="executive-card">
        <div className="px-5 pt-5 pb-3">
          <p className="text-sm font-semibold">Resolution Performance</p>
          <p className="text-xs text-muted-foreground mt-0.5">Mean time to resolution vs. severity target</p>
        </div>
        <CardContent className="px-5 pb-5 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mttrBySeverity.map((s) => {
              const pct = Math.round((s.actual / s.target) * 100);
              const isWithin = s.actual <= s.target;
              return (
                <div key={s.severity} className="p-3 rounded-md bg-muted/15 border border-border/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{s.severity}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isWithin ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {isWithin ? 'Within SLA' : 'Breached'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Actual: <span className="font-mono font-semibold text-foreground">{s.label}</span></span>
                      <span>Target: <span className="font-mono">{s.target}h</span></span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isWithin ? 'bg-emerald-500/70' : 'bg-rose-500/70'}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="executive-card border-primary/15">
        <div className="px-5 pt-5 pb-3">
          <p className="text-sm font-semibold">Recovery Governance</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            KPI ownership and forum definition for escalation leadership reviews
          </p>
        </div>
        <CardContent className="px-5 pb-5 pt-0">
          <div className="grid gap-3 md:grid-cols-2">
            {escalationGovernanceKeys.map((key) => {
              const meta = kpiMetadata[key];

              return (
                <div
                  key={key}
                  className="rounded-md border border-border/30 bg-muted/10 p-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {meta.label}
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Source
                      </p>
                      <p className="mt-1 text-muted-foreground">{meta.source}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Owner
                      </p>
                      <p className="mt-1 text-foreground/90">{meta.owner}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Review Forum
                      </p>
                      <p className="mt-1 text-muted-foreground">{meta.forum}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div id="recovery-decisions" className="section-divider">
        <span className="section-label">Recovery Decisions</span>
      </div>

      <div className="space-y-3">
        <QueueFilters
          basePath="/escalations"
          anchor="recovery-decisions"
          itemLabel="recovery items"
          owners={filterOptions.owners}
          regions={filterOptions.regions}
          windows={filterOptions.windows}
          selected={activeFilters}
          totalCount={escalationData.length}
          filteredCount={sortedEscalations.length}
        />

        {sortedEscalations.length === 0 && (
          <div className="rounded-lg border border-dashed border-border/40 bg-muted/5 p-6 text-center">
            <p className="text-sm font-medium">No recovery items match this filter set.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Clear the owner, region, or window filters to reopen the full escalation backlog.
            </p>
          </div>
        )}

        {sortedEscalations.map((esc) => (
          <Card key={esc.id} className="executive-card overflow-hidden">
            <div className={`h-1 w-full ${severityStyles[esc.severity] ?? 'bg-muted'}`} />
            <CardContent className="p-5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-muted-foreground">{esc.id}</span>
                    <Badge variant={esc.severity === 'Critical' ? 'destructive' : 'secondary'} className="text-[10px]">{esc.severity}</Badge>
                    <Badge variant="outline" className="text-[10px]">{esc.status}</Badge>
                  </div>
                  <p className="text-sm font-semibold leading-snug">{esc.subject}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{esc.region}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="tabular-nums">{esc.age}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 xl:grid-cols-[1.2fr_0.7fr_1fr]">
                <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Decision Required
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {esc.decision}
                  </p>
                </div>

                <div className="rounded-md border border-border/30 bg-muted/10 p-3 space-y-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-primary" />
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Accountable Owner
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-foreground/90">{esc.owner}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Decision Window
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-foreground/90">
                      {esc.decisionWindow}
                    </p>
                  </div>
                </div>

                <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-primary" />
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Expected Impact
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {esc.impact}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-border/30 pt-3">
                <p className="text-[11px] text-muted-foreground/65">
                  Impacted account / order view
                </p>
                <Link
                  href={esc.drillHref}
                  className="inline-flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-primary/80"
                >
                  {esc.drillLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
