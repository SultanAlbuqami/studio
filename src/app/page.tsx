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

        <DashboardHeader />

        {/* ── Spotlight KPIs ── */}
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

        {/* ── Secondary Metrics ── */}
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

        {/* ── Main Dashboard Body ── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          {/* Left: Analytics & Risk */}
          <div className="xl:col-span-8 space-y-6">

            <section>
              <div className="section-divider">
                <span className="section-label">Execution Health</span>
              </div>
              <PortfolioHealth />
            </section>

            <section id="commercial-risk">
              <div className="section-divider">
                <span className="section-label">Commercial Risk</span>
              </div>
              <AccountExposure focusedProfileId={homeFocusedAccount?.focusId} />
            </section>
          </div>

          {/* Right Rail */}
          <aside className="xl:col-span-4">
            <div className="sticky top-6 space-y-6 xl:max-h-[calc(100svh-3rem)] xl:overflow-y-auto xl:pr-1">

              <section>
                <div className="section-divider">
                  <span className="section-label">Operating Brief</span>
                </div>
                <ExecutiveBriefAI isAiConfigured={isAiConfigured} compact />
              </section>

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
