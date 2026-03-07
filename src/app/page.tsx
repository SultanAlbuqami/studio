import { DashboardHeader } from '@/components/dashboard/header';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { ExecutiveBriefAI } from '@/components/dashboard/executive-brief-ai';
import { PortfolioHealth } from '@/components/dashboard/portfolio-health';
import { InterventionQueue } from '@/components/dashboard/intervention-queue';
import { AccountExposure } from '@/components/dashboard/account-exposure';
import { KpiGovernancePanel } from '@/components/dashboard/kpi-governance-panel';
import { accountRiskProfiles, dashboardData } from '@/app/lib/dashboard-data';
import { kpiMetadata, leadershipGovernanceKeys } from '@/app/lib/kpi-metadata';
import { getFirstSearchParamValue } from '@/app/lib/queue-filters';
import { hasConfiguredAiKey } from '@/ai/config';
import {
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
    <div className="min-h-screen bg-background text-foreground">
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

        <KpiGovernancePanel
          title="Leadership Governance"
          description="Revenue exposure, acceptance, and backlog thresholds are governed from the same source, owner, and review forum definitions used across the live cockpit."
          keys={leadershipGovernanceKeys}
          compact
        />

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
            <div className="sticky top-6 space-y-6">

              {/* AI Intelligence — Executive Brief + Recommended Actions */}
              <section>
                <div className="section-divider">
                  <span className="section-label">AI Intelligence</span>
                </div>
                <ExecutiveBriefAI isAiConfigured={isAiConfigured} compact />
              </section>

              {/* Intervention Queue — the action center */}
              <section>
                <div className="section-divider">
                  <span className="section-label">Intervention Queue</span>
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
