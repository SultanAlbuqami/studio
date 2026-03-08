import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/header';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { ExecutiveBriefAI } from '@/components/dashboard/executive-brief-ai';
import { PortfolioHealth } from '@/components/dashboard/portfolio-health';
import { InterventionQueue } from '@/components/dashboard/intervention-queue';
import { AccountExposure } from '@/components/dashboard/account-exposure';
import { accountRiskProfiles, dashboardData } from '@/app/lib/dashboard-data';
import { kpiMetadata } from '@/app/lib/kpi-metadata';
import { getFirstSearchParamValue } from '@/app/lib/queue-filters';
import { hasConfiguredAiKey } from '@/ai/config';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Package,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';

type ExecutiveOverviewProps = {
  searchParams?: Promise<{
    focus?: string | string[];
  }>;
};

export default async function ExecutiveOverview({
  searchParams,
}: ExecutiveOverviewProps) {
  const isAiConfigured = hasConfiguredAiKey();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const focusedAccountId = getFirstSearchParamValue(resolvedSearchParams?.focus);
  const homeFocusedAccount = accountRiskProfiles.find(
    (item) => item.focusId === focusedAccountId,
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">

        {/* ── Command Bar ── */}
        <DashboardHeader />

        {/* ── Spotlight KPIs — the 3 metrics that define "how are we doing right now" ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard
            label={kpiMetadata.onTimeDelivery.label}
            value={`${dashboardData.onTimeDeliveryPercentage}%`}
            icon={CheckCircle2}
            trend={{ value: "-0.8%", positive: false }}
            variant="spotlight"
            className="border-amber-500/20"
          />
          <KpiCard
            label={kpiMetadata.revenueAtRisk.label}
            value={`${(dashboardData.revenueAtRisk / 1000000).toFixed(1)}M`}
            subValue="SAR"
            icon={ShieldAlert}
            variant="spotlight"
            className="border-destructive/25"
          />
          <KpiCard
            label={kpiMetadata.activeOrders.label}
            value={dashboardData.ordersInFlight.toLocaleString()}
            icon={Package}
            trend={{ value: "+5.2%", positive: true }}
            variant="spotlight"
          />
        </section>

        {/* ── Secondary Metrics — context and pipeline depth ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard
            label={kpiMetadata.acceptedValueMTD.label}
            value={`${(dashboardData.acceptedValueMTD / 1000000).toFixed(1)}M`}
            subValue="SAR"
            icon={TrendingUp}
          />
          <KpiCard
            label={kpiMetadata.acceptancePending.label}
            value={dashboardData.acceptancePending}
            icon={CreditCard}
            trend={{ value: "+14", positive: false }}
          />
          <KpiCard
            label={kpiMetadata.pastDueBacklog.label}
            value={dashboardData.pastDueBacklog}
            icon={Clock}
            className="border-rose-500/15"
          />
        </section>

        {/* ── Governance footnote ── */}
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border/40 bg-card/40 px-4 py-2.5">
          <p className="text-[11px] text-muted-foreground">
            All metrics governed with named source, accountable owner, and review cadence.
          </p>
          <Link
            href="/deployment"
            className="inline-flex items-center gap-1 text-[11px] text-primary/70 transition-colors hover:text-primary shrink-0"
          >
            View KPI governance
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* ── Main Dashboard Body ── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* Left: Analytics & Risk */}
          <div className="xl:col-span-8 space-y-6">

            {/* Execution Health */}
            <section>
              <div className="section-divider">
                <span className="section-label">Execution Health</span>
              </div>
              <PortfolioHealth />
            </section>

            {/* Commercial Risk */}
            <section id="commercial-risk">
              <div className="section-divider">
                <span className="section-label">Commercial Risk</span>
              </div>
              <AccountExposure focusedProfileId={homeFocusedAccount?.focusId} />
            </section>
          </div>

          {/* Right Rail: Decisions & Intelligence */}
          <aside className="xl:col-span-4">
            <div className="sticky top-6 space-y-6 xl:max-h-[calc(100svh-3rem)] xl:overflow-y-auto xl:pr-1">

              {/* AI Intelligence — Executive Brief + Recommended Actions */}
              <section>
                <div className="section-divider">
                  <span className="section-label">AI Intelligence</span>
                </div>
                <ExecutiveBriefAI isAiConfigured={isAiConfigured} compact />
              </section>

              {/* Requires Action — the intervention center */}
              <section>
                <div className="section-divider">
                  <span className="section-label">Requires Action</span>
                </div>
                <InterventionQueue />
              </section>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
