import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/header';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { ExecutiveBriefAI } from '@/components/dashboard/executive-brief-ai';
import { PortfolioHealth } from '@/components/dashboard/portfolio-health';
import { InterventionQueue } from '@/components/dashboard/intervention-queue';
import { AccountExposure } from '@/components/dashboard/account-exposure';
import { ExecutiveDecisionDesk } from '@/components/dashboard/executive-decision-desk';
import { ExecutiveActionRegister } from '@/components/dashboard/executive-action-register';
import { SalamServiceCoverage } from '@/components/dashboard/salam-service-coverage';
import { Card, CardContent } from '@/components/ui/card';
import {
  accountRiskProfiles,
  dashboardData,
  dataConfidenceSummary,
  executiveActionSummary,
  executiveScenarioSummary,
  executiveScenarios,
} from '@/app/lib/dashboard-data';
import { kpiMetadata } from '@/app/lib/kpi-metadata';
import { getFirstSearchParamValue } from '@/app/lib/queue-filters';
import { hasConfiguredAiKey } from '@/ai/config';
import { buildPageMetadata } from '@/app/lib/page-metadata';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Package,
  ShieldCheck,
  Target,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';

type ExecutiveOverviewProps = {
  searchParams?: Promise<{
    focus?: string | string[];
  }>;
};

export const metadata = buildPageMetadata('/');

export default async function ExecutiveOverview({
  searchParams,
}: ExecutiveOverviewProps) {
  const isAiConfigured = hasConfiguredAiKey();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const focusedAccountId = getFirstSearchParamValue(resolvedSearchParams?.focus);
  const homeFocusedAccount = accountRiskProfiles.find(
    (item) => item.focusId === focusedAccountId,
  );
  const primaryScenario = executiveScenarios[0];
  const primaryScenarioEffect = primaryScenario?.effects[0];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-7 px-5 py-6 md:px-8 md:py-8">
        <DashboardHeader />

        <section>
          <div className="section-divider">
            <span className="section-label">Leadership Snapshot</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              label={kpiMetadata.revenueAtRisk.label}
              value={`${(dashboardData.revenueAtRisk / 1000000).toFixed(1)}M`}
              subValue="SAR"
              icon={ShieldAlert}
              variant="spotlight"
              tone="critical"
              className="border-destructive/18"
            />
            <KpiCard
              label={kpiMetadata.onTimeDelivery.label}
              value={`${dashboardData.onTimeDeliveryPercentage}%`}
              icon={CheckCircle2}
              trend={{ value: "-0.8%", positive: false }}
              variant="spotlight"
              tone="primary"
              className="border-amber-500/14"
            />
            <KpiCard
              label={kpiMetadata.acceptancePending.label}
              value={dashboardData.acceptancePending}
              icon={CreditCard}
              trend={{ value: "+14", positive: false }}
              variant="spotlight"
              tone="warning"
            />
            <KpiCard
              label={kpiMetadata.activeOrders.label}
              value={dashboardData.ordersInFlight.toLocaleString()}
              icon={Package}
              trend={{ value: "+5.2%", positive: true }}
              variant="spotlight"
              tone="success"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <KpiCard
              label={kpiMetadata.acceptedValueMTD.label}
              value={`${(dashboardData.acceptedValueMTD / 1000000).toFixed(1)}M`}
              subValue="SAR"
              icon={TrendingUp}
              tone="success"
            />
            <KpiCard
              label={kpiMetadata.pastDueBacklog.label}
              value={dashboardData.pastDueBacklog}
              icon={Clock}
              tone="critical"
              className="border-rose-500/12"
            />
          </div>
        </section>

        <section>
          <div className="section-divider">
            <span className="section-label">Executive Command Layer</span>
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <ExecutiveDecisionDesk />

            <div className="space-y-6">
              <ExecutiveBriefAI isAiConfigured={isAiConfigured} compact />

              <Card className="executive-card overflow-hidden">
                <div className="border-b border-border/30 px-4 py-3">
                  <p className="text-sm font-semibold">Control Intelligence</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/72">
                    The shortest path from trust to action in the current portfolio.
                  </p>
                </div>
                <CardContent className="space-y-3 p-3">
                  <div className="rounded-[1rem] border border-border/30 bg-background/22 p-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/72">
                        Confidence posture
                      </p>
                    </div>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-foreground">
                      {dataConfidenceSummary.score}/100
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                      {dataConfidenceSummary.governedKpis} governed KPIs across {dataConfidenceSummary.sourceDomains} source domains.
                    </p>
                    <Link
                      href="/methodology"
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Open governance view
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="rounded-[1rem] border border-border/30 bg-background/22 p-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-3.5 w-3.5 text-primary" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/72">
                        Deterministic lever
                      </p>
                    </div>
                    <p className="mt-2 text-[13px] font-semibold leading-relaxed text-foreground">
                      {executiveScenarioSummary.primaryRecommendation}
                    </p>
                    {primaryScenarioEffect && (
                      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                        {primaryScenarioEffect.label}: {primaryScenarioEffect.current}
                        {primaryScenarioEffect.unit === 'M SAR' ? ` ${primaryScenarioEffect.unit}` : primaryScenarioEffect.unit ?? ''}
                        {' -> '}
                        {primaryScenarioEffect.projected}
                        {primaryScenarioEffect.unit === 'M SAR' ? ` ${primaryScenarioEffect.unit}` : primaryScenarioEffect.unit ?? ''}
                      </p>
                    )}
                    <Link
                      href={primaryScenario?.href ?? '/delivery'}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Open supporting scenario view
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="rounded-[1rem] border border-border/30 bg-background/22 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/72">
                      Action posture
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full border border-destructive/30 bg-destructive/12 px-2 py-1 text-[10px] font-semibold text-destructive">
                        {executiveActionSummary.readyNow} ready now
                      </span>
                      <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-300">
                        {executiveActionSummary.mobilizing} mobilizing
                      </span>
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                        {executiveActionSummary.tracking} tracking
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <InterventionQueue />
            </div>
          </div>
        </section>

        <section>
          <div className="section-divider">
            <span className="section-label">Salam Coverage</span>
          </div>
          <SalamServiceCoverage compact />
        </section>

        <section>
          <div className="section-divider">
            <span className="section-label">Operating Depth</span>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="xl:col-span-8 space-y-6">
              <PortfolioHealth />
            </div>
            <aside className="xl:col-span-4">
              <ExecutiveActionRegister compact />
            </aside>
          </div>
        </section>

        <section id="commercial-risk">
          <div className="section-divider">
            <span className="section-label">Commercial Risk</span>
          </div>
          <AccountExposure focusedProfileId={homeFocusedAccount?.focusId} />
        </section>
      </div>
    </div>
  );
}
