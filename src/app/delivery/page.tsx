import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import {
  deliveryFieldAlerts,
  deliveryExceptions,
  deliveryKpis,
  deliveryMilestones,
  orderToActivateTrend,
} from '@/app/lib/dashboard-data';
import {
  deliveryGovernanceKeys,
  kpiMetadata,
} from '@/app/lib/kpi-metadata';
import {
  applyQueueFilters,
  buildQueueViewHref,
  getFirstSearchParamValue,
  getQueueFilterOptions,
  resolveQueueFilters,
} from '@/app/lib/queue-filters';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  Clock3,
  Cpu,
  HardHat,
  MapPin,
  ShieldCheck,
  Target,
  Timer,
  User,
} from 'lucide-react';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { DeliveryTrendChart } from './delivery-trend-chart';
import { KpiGovernancePanel } from '@/components/dashboard/kpi-governance-panel';
import { FocusDetailSheet } from '@/components/dashboard/focus-detail-sheet';
import { QueueFilters } from '@/components/dashboard/queue-filters';

const stageIcons = [MapPin, HardHat, Cpu, ShieldCheck];

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-400',
  'in-progress': 'bg-primary/10 text-primary',
  pending: 'bg-muted text-muted-foreground',
  'at-risk': 'bg-destructive/10 text-destructive',
};

function progressForStatus(status: string) {
  if (status === 'completed') return 100;
  if (status === 'in-progress') return 75;
  if (status === 'at-risk') return 45;
  return 20;
}

type DeliveryPageProps = {
  searchParams?: Promise<{
    focus?: string | string[];
    owner?: string | string[];
    region?: string | string[];
    window?: string | string[];
  }>;
};

export default async function DeliveryPage({
  searchParams,
}: DeliveryPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const focusedException = getFirstSearchParamValue(resolvedSearchParams?.focus);
  const activeFilters = resolveQueueFilters(resolvedSearchParams);
  const filteredExceptions = applyQueueFilters(deliveryExceptions, activeFilters);
  const filterOptions = getQueueFilterOptions(deliveryExceptions);
  const focusedDetail =
    deliveryExceptions.find((item) => item.id === focusedException)?.detail ??
    null;
  const clearFocusHref = buildQueueViewHref(
    '/delivery',
    activeFilters,
    'delivery-decisions',
  );

  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="Delivery Control Tower" subtitle="Field Operations" />

      {/* Stage cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {deliveryMilestones.map((m, idx) => {
          const Icon = stageIcons[idx];
          return (
            <div key={m.stage} className="executive-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center h-7 w-7 rounded-md bg-muted/50">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${statusStyles[m.status] ?? ''}`}>
                  {m.status.replace('-', ' ')}
                </span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">{m.stage}</p>
              <p className="text-xl font-bold">{m.count}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px]">
                <span className="text-muted-foreground">Avg <span className="font-mono tabular-nums">{m.avgDays}d</span></span>
                {m.overdue > 0 && (
                  <span className="text-rose-400 font-semibold">{m.overdue} overdue</span>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Delivery Quality KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <KpiCard
          label={kpiMetadata.firstTimeRightDelivery.label}
          value={`${deliveryKpis.firstTimeRight}%`}
          icon={Target}
          variant="compact"
        />
        <KpiCard
          label={kpiMetadata.avgDeliveryCycleTime.label}
          value={`${deliveryKpis.avgCycleTime} Days`}
          icon={Timer}
          trend={{ value: deliveryKpis.cycleTimeTrend, positive: true }}
          variant="compact"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Milestone progress + aging */}
        <Card className="lg:col-span-3 executive-card">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">Delivery Milestones</p>
            <p className="text-xs text-muted-foreground mt-0.5">Pipeline stage progression and aging</p>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-5">
            {deliveryMilestones.map((m) => (
              <div key={m.stage} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{m.stage}</span>
                  <div className="flex items-center gap-3">
                    {m.overdue > 0 && (
                      <span className="text-[11px] text-rose-400 font-semibold">{m.overdue} overdue</span>
                    )}
                    <span className="text-muted-foreground tabular-nums">{m.count}</span>
                  </div>
                </div>
                <Progress value={progressForStatus(m.status)} className="h-1.5" />
                <p className="text-[11px] text-muted-foreground">Avg stage duration: <span className="font-mono tabular-nums">{m.avgDays} days</span></p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right column: trend chart + field alerts stacked */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order-to-Activate Trend */}
          <DeliveryTrendChart data={orderToActivateTrend} />

          {/* Field alerts */}
          <Card className="executive-card">
            <div className="px-5 pt-5 pb-3">
              <p className="text-sm font-semibold">Field Alerts</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Shared delivery signals sourced from the operating decision queue
              </p>
            </div>
            <CardContent className="px-5 pb-5 pt-0 space-y-3">
              {deliveryFieldAlerts.map((alert) => (
                <Link
                  key={alert.id}
                  href={alert.href}
                  className={`block rounded-md border p-3 transition-colors hover:bg-muted/10 ${
                    alert.tone === 'critical'
                      ? 'border-destructive/15 bg-destructive/5'
                      : alert.tone === 'warning'
                        ? 'border-amber-500/15 bg-amber-500/5'
                        : 'border-emerald-500/15 bg-emerald-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          alert.tone === 'critical'
                            ? 'text-destructive'
                            : alert.tone === 'warning'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                        }`}
                      >
                        {alert.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {alert.detail}
                      </p>
                    </div>
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card id="delivery-decisions" className="executive-card">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">Delivery Decision Queue</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Exceptions that need PMO or executive action before they convert
              into missed milestones or delayed billing.
            </p>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-3">
            <QueueFilters
              basePath="/delivery"
              anchor="delivery-decisions"
              itemLabel="delivery decisions"
              owners={filterOptions.owners}
              regions={filterOptions.regions}
              windows={filterOptions.windows}
              selected={activeFilters}
              totalCount={deliveryExceptions.length}
              filteredCount={filteredExceptions.length}
            />

            {filteredExceptions.length === 0 && (
              <div className="rounded-lg border border-dashed border-border/40 bg-muted/5 p-6 text-center">
                <p className="text-sm font-medium">No delivery decisions match this filter set.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Clear the owner, region, or window filters to reopen the full recovery queue.
                </p>
              </div>
            )}

            {filteredExceptions.map((item) => {
              const isFocused = item.id === focusedException;

              return (
                <div
                  key={item.id}
                  className={`rounded-lg border p-4 ${
                    isFocused
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/30 bg-muted/10'
                  }`}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                          {item.stage}
                        </span>
                        <span className="rounded-full border border-border/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {item.region}
                        </span>
                        <span className="rounded-full border border-border/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {item.status}
                        </span>
                        {isFocused && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                            Focused
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-snug">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.account}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 xl:grid-cols-[1.1fr_0.85fr_0.95fr_1fr]">
                    <div className="rounded-md border border-border/30 bg-background/30 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Decision Required
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {item.decision}
                      </p>
                    </div>

                    <div className="rounded-md border border-border/30 bg-background/30 p-3 space-y-3">
                      <div className="flex items-start gap-2">
                        <User className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Accountable Owner
                          </p>
                          <p className="mt-2 text-sm text-foreground/90">
                            {item.owner}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Decision Window
                          </p>
                          <p className="mt-2 text-sm text-foreground/90">
                            {item.decisionWindow}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border border-border/30 bg-background/30 p-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Region
                          </p>
                          <p className="mt-2 text-sm text-foreground/90">
                            {item.region}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border border-border/30 bg-background/30 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Expected Impact
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {item.impact}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/30 pt-3">
                    <p className="text-[11px] text-muted-foreground/65">
                      Related account / order view
                    </p>
                    <Link
                      href={item.drillHref}
                      className="inline-flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-primary/80"
                    >
                      {item.drillLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <KpiGovernancePanel
          title="Delivery Governance"
          description="Shared thresholds, owners, and review forums for the delivery cockpit."
          keys={deliveryGovernanceKeys}
          className="h-fit"
        />
      </div>

      <FocusDetailSheet
        detail={focusedDetail}
        clearHref={clearFocusHref}
      />
    </div>
  );
}
