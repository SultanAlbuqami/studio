import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import {
  acceptanceControlMetrics,
  acceptanceLeadershipNote,
  dashboardData,
  strategicDecisionQueue,
  strategicOrders,
} from '@/app/lib/dashboard-data';
import { leadershipGovernanceKeys } from '@/app/lib/kpi-metadata';
import {
  applyQueueFilters,
  buildQueueViewHref,
  getFirstSearchParamValue,
  getQueueFilterOptions,
  resolveQueueFilters,
} from '@/app/lib/queue-filters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock3, MapPin, User } from 'lucide-react';
import { KpiGovernancePanel } from '@/components/dashboard/kpi-governance-panel';
import { FocusDetailSheet } from '@/components/dashboard/focus-detail-sheet';
import { QueueFilters } from '@/components/dashboard/queue-filters';

const totalValue = strategicOrders.reduce((sum, o) => {
  const num = Number.parseFloat(o.value.replace('M', ''));
  return sum + num;
}, 0);
const atRiskCount = strategicOrders.filter((o) => o.status === 'At Risk').length;
const avgProgress = Math.round(strategicOrders.reduce((s, o) => s + o.progress, 0) / strategicOrders.length);

type StrategicOrdersPageProps = {
  searchParams?: Promise<{
    focus?: string | string[];
    owner?: string | string[];
    region?: string | string[];
    window?: string | string[];
  }>;
};

export default async function StrategicOrdersPage({
  searchParams,
}: StrategicOrdersPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const focusedOrderId = getFirstSearchParamValue(resolvedSearchParams?.focus);
  const activeFilters = resolveQueueFilters(resolvedSearchParams);
  const filteredDecisionQueue = applyQueueFilters(
    strategicDecisionQueue,
    activeFilters,
  );
  const filterOptions = getQueueFilterOptions(strategicDecisionQueue);
  const focusedDetail =
    strategicDecisionQueue.find((item) => item.orderId === focusedOrderId)
      ?.detail ?? null;
  const clearFocusHref = buildQueueViewHref(
    '/strategic',
    activeFilters,
    'strategic-decisions',
  );

  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="Strategic Orders" subtitle="High-Value Accounts" />

      {/* Summary Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="executive-card p-4">
          <p className="section-label mb-1">Portfolio Value</p>
          <p className="text-2xl font-bold tabular-nums">{totalValue.toFixed(1)}M <span className="text-xs text-muted-foreground font-normal">SAR</span></p>
        </div>
        <div className="executive-card p-4">
          <p className="section-label mb-1">At Risk Orders</p>
          <p className="text-2xl font-bold text-rose-400 tabular-nums">{atRiskCount}</p>
          <p className="text-xs text-muted-foreground mt-0.5">of {strategicOrders.length} in flight</p>
        </div>
        <div className="executive-card p-4">
          <p className="section-label mb-1">Avg Progress</p>
          <p className="text-2xl font-bold tabular-nums">{avgProgress}%</p>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary/70 rounded-full" style={{ width: `${avgProgress}%` }} />
          </div>
        </div>
        <div className="executive-card p-4">
          <p className="section-label mb-1">Revenue Exposed</p>
          <p className="text-2xl font-bold text-rose-400 tabular-nums">{(dashboardData.revenueAtRisk / 1000000).toFixed(1)}M <span className="text-xs text-muted-foreground font-normal">SAR</span></p>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="executive-card overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">Major Accounts — In Flight</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Strategic orders requiring executive oversight
            </p>
          </div>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/30">
                  <TableHead className="section-label h-9 pl-5">Order</TableHead>
                  <TableHead className="section-label h-9">Account</TableHead>
                  <TableHead className="section-label h-9">Service</TableHead>
                  <TableHead className="section-label h-9 text-right">Value</TableHead>
                  <TableHead className="section-label h-9">Progress</TableHead>
                  <TableHead className="section-label h-9">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {strategicOrders.map((order) => {
                  const isFocused = order.id === focusedOrderId;

                  return (
                    <TableRow
                      key={order.id}
                      className={`border-border/20 transition-colors ${
                        isFocused
                          ? 'bg-primary/5 hover:bg-primary/5'
                          : 'hover:bg-muted/10'
                      }`}
                    >
                      <TableCell className="font-mono text-xs pl-5">
                        {order.id}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {order.account}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.service}
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-right tabular-nums">
                        {order.value}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-14 bg-muted rounded-full h-1.5">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {order.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === 'On Track' ? 'default' : 'destructive'
                          }
                          className="text-[10px]"
                        >
                          {order.status === 'On Track' ? 'Stable' : 'At Risk'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card id="strategic-decisions" className="executive-card">
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Strategic Decision Queue</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Orders that require a director-level call before revenue or
                  customer confidence moves off plan.
                </p>
              </div>
              <span className="flex h-5 min-w-5 items-center justify-center rounded bg-destructive/15 px-1.5 text-[11px] font-bold tabular-nums text-destructive">
                {strategicDecisionQueue.length}
              </span>
            </div>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-3">
            <QueueFilters
              basePath="/strategic"
              anchor="strategic-decisions"
              itemLabel="decisions"
              owners={filterOptions.owners}
              regions={filterOptions.regions}
              windows={filterOptions.windows}
              selected={activeFilters}
              totalCount={strategicDecisionQueue.length}
              filteredCount={filteredDecisionQueue.length}
            />

            {filteredDecisionQueue.length === 0 && (
              <div className="rounded-lg border border-dashed border-border/40 bg-muted/5 p-6 text-center">
                <p className="text-sm font-medium">No decisions match this filter set.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Clear the owner, region, or window filters to return to the full queue.
                </p>
              </div>
            )}

            {filteredDecisionQueue.map((item) => {
              const isFocused = item.orderId === focusedOrderId;

              return (
                <div
                  key={item.orderId}
                  className={`rounded-lg border p-4 ${
                    isFocused
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/30 bg-muted/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                      {item.orderId}
                    </span>
                    <span className="rounded-full border border-border/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {item.region}
                    </span>
                    <Badge
                      variant={item.status === 'At Risk' ? 'destructive' : 'secondary'}
                      className="text-[10px]"
                    >
                      {item.status}
                    </Badge>
                    {isFocused && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                        Focused
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-semibold leading-snug">
                    {item.account}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.service}
                  </p>

                  <div className="mt-3 rounded-md border border-border/30 bg-background/30 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Decision Required
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                      {item.decision}
                    </p>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-md border border-border/30 bg-background/30 p-3">
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
                  </div>

                  <div className="mt-3 rounded-md border border-border/30 bg-background/30 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Expected Impact
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                      {item.impact}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/30 pt-3">
                    <p className="text-[11px] text-muted-foreground/65">
                      Related account / delivery program
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
      </div>

      <KpiGovernancePanel
        title="Leadership Governance"
        description="Revenue exposure, acceptance, and backlog metrics use the same governed definitions on the executive overview and strategic account pages."
        keys={leadershipGovernanceKeys}
        compact
      />

      {/* Acceptance metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="executive-card p-4">
          <p className="section-label mb-1">Pending Acceptance</p>
          <p className="text-2xl font-bold">{dashboardData.acceptancePending}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Items awaiting sign-off</p>
        </Card>
        <Card className="executive-card p-4">
          <p className="section-label mb-1">Overdue Acceptance</p>
          <p className="text-2xl font-bold text-rose-400">
            {acceptanceControlMetrics.overdueItems}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Past target acceptance date</p>
        </Card>
        <Card className="executive-card p-4">
          <p className="section-label mb-1">Rejection Rate</p>
          <p className="text-2xl font-bold">
            {acceptanceControlMetrics.rejectionRate}%
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Below 5% threshold</p>
        </Card>
        <Card className="executive-card p-4 border-primary/15">
          <p className="section-label mb-1">PMO Action</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {acceptanceLeadershipNote.summary}
          </p>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/30 pt-3 text-[11px]">
            <span className="text-muted-foreground/70">
              {acceptanceLeadershipNote.owner} | {acceptanceLeadershipNote.decisionWindow}
            </span>
            <Link
              href={acceptanceLeadershipNote.href}
              className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary/80"
            >
              Open recovery view
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Card>
      </div>

      <FocusDetailSheet
        detail={focusedDetail}
        clearHref={clearFocusHref}
      />
    </div>
  );
}
