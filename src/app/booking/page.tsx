"use client";

import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { bookingFulfillmentData } from '@/app/lib/dashboard-data';
import {
  bookingGovernanceKeys,
  kpiMetadata,
} from '@/app/lib/kpi-metadata';
import { KpiGovernancePanel } from '@/components/dashboard/kpi-governance-panel';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock,
  Timer,
  XCircle,
} from 'lucide-react';

export default function BookingPage() {
  const maxFunnel = bookingFulfillmentData.fulfillmentFunnel[0].count;
  const totalAgingOrders = bookingFulfillmentData.orderAgeDistribution.reduce(
    (sum, bucket) => sum + bucket.orders,
    0
  );
  const agingRiskCount = bookingFulfillmentData.orderAgeDistribution
    .filter((bucket) => !bucket.bucket.startsWith('0') && !bucket.bucket.startsWith('8'))
    .reduce((sum, bucket) => sum + bucket.orders, 0);
  const agingRiskShare = Math.round((agingRiskCount / totalAgingOrders) * 100);
  const oldestBucket = bookingFulfillmentData.orderAgeDistribution.at(-1);

  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="Booking & Fulfillment" subtitle="Order Pipeline" />

      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          label={kpiMetadata.newOrdersMtd.label}
          value={bookingFulfillmentData.newOrdersMTD}
          icon={ClipboardList}
          trend={{ value: "+12%", positive: true }}
          variant="spotlight"
        />
        <KpiCard
          label={kpiMetadata.avgBookingToBilling.label}
          value={`${bookingFulfillmentData.averageBookingToBillingDays}d`}
          icon={Clock}
          trend={{ value: "-2.5d", positive: true }}
          variant="spotlight"
        />
        <KpiCard
          label={kpiMetadata.onTimeFulfillment.label}
          value={`${bookingFulfillmentData.onTimeFulfillmentRate}%`}
          icon={CheckCircle2}
          variant="spotlight"
        />
        <KpiCard
          label={kpiMetadata.orderFallout.label}
          value={`${bookingFulfillmentData.orderFalloutRate}%`}
          icon={XCircle}
          variant="spotlight"
          className="border-rose-500/15"
        />
        <KpiCard
          label={kpiMetadata.cancellations.label}
          value={bookingFulfillmentData.cancelledOrdersMTD}
          icon={AlertCircle}
          variant="spotlight"
          className="border-destructive/20"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Fulfillment Funnel */}
        <Card className="executive-card">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">Fulfillment Funnel</p>
            <p className="text-xs text-muted-foreground mt-0.5">Order-to-bill conversion — current month</p>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-3">
            {bookingFulfillmentData.fulfillmentFunnel.map((step, idx) => {
              const pct = Math.round((step.count / maxFunnel) * 100);
              const convRate = idx > 0
                ? Math.round((step.count / bookingFulfillmentData.fulfillmentFunnel[idx - 1].count) * 100)
                : 100;
              return (
                <div key={step.stage} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium">{step.stage}</span>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {idx > 0 && (
                        <span className="rounded-full border border-border/40 bg-background/40 px-2 py-0.5 text-[10px] text-muted-foreground/80 tabular-nums">
                          Step yield {convRate}%
                        </span>
                      )}
                      <span className="text-sm font-mono tabular-nums text-muted-foreground">{step.count}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/70 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="pt-2 border-t border-border/30 flex justify-between items-baseline">
              <span className="section-label">End-to-End Yield</span>
              <span className="text-sm font-bold tabular-nums">
                {Math.round(((bookingFulfillmentData.fulfillmentFunnel.at(-1)?.count ?? 0) / maxFunnel) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Throughput by Region */}
        <Card className="executive-card">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">Throughput by Region</p>
            <p className="text-xs text-muted-foreground mt-0.5">Monthly order volume and growth</p>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-2">
            {bookingFulfillmentData.throughputByRegion.map((r) => (
              <div key={r.region} className="flex items-center justify-between px-3 py-2.5 rounded-md bg-muted/20 border border-border/30">
                <span className="text-sm font-medium">{r.region}</span>
                <div className="flex flex-wrap items-center justify-end gap-2.5">
                  <span className="text-sm font-mono tabular-nums text-muted-foreground">{r.volume} orders</span>
                  <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                    r.growth.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {r.growth}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Age Distribution */}
        <Card className="executive-card">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">Order Age Distribution</p>
            <p className="text-xs text-muted-foreground mt-0.5">Aging analysis across pipeline stages</p>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                  <p className="section-label">15d+ backlog</p>
                </div>
                <p className="mt-2 text-2xl font-bold tabular-nums">
                  {agingRiskCount}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {agingRiskShare}% of the pipeline is sitting beyond two weeks
                  and should be reviewed in the next PMO control call.
                </p>
              </div>
              <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                <div className="flex items-center gap-2">
                  <Timer className="h-3.5 w-3.5 text-primary" />
                  <p className="section-label">Oldest bucket</p>
                </div>
                <p className="mt-2 text-2xl font-bold tabular-nums">
                  {oldestBucket?.orders ?? 0}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Orders aged {oldestBucket?.bucket ?? 'n/a'} typically need
                  escalation on customer readiness, permits, or provisioning
                  dependency.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {bookingFulfillmentData.orderAgeDistribution.map((bucket, index) => {
                const share = Math.round((bucket.orders / totalAgingOrders) * 100);
                let tone = 'bg-primary/70';

                if (index >= bookingFulfillmentData.orderAgeDistribution.length - 1) {
                  tone = 'bg-destructive/70';
                } else if (index >= bookingFulfillmentData.orderAgeDistribution.length - 2) {
                  tone = 'bg-amber-400/80';
                }

                return (
                  <div key={bucket.bucket} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground/90">
                          {bucket.bucket}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                          {share}% of orders
                        </span>
                      </div>
                      <span className="font-mono tabular-nums text-muted-foreground">
                        {bucket.orders}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${tone}`}
                        style={{ width: `${share}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border/30 pt-3">
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Aging is most manageable in the first two buckets. The focus for
                leadership is the {agingRiskCount} orders already sitting beyond
                14 days, because they are the most likely to convert into
                fallout, acceptance slippage, or billing delay.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <KpiGovernancePanel
        title="Booking Governance"
        description="Thresholds, accountable owners, and review forums are shared from the same KPI dictionary used across the live cockpit."
        keys={bookingGovernanceKeys}
      />
    </div>
  );
}
