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
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  LayoutDashboard,
  Package,
  Rocket,
  Search,
  Star,
  Truck,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';

type ExecutiveOverviewProps = {
  searchParams?: Promise<{
    focus?: string | string[];
  }>;
};

const leadershipWalkthrough = [
  {
    step: '01',
    title: 'Start with executive posture',
    href: '/',
    icon: LayoutDashboard,
    description:
      'Open the portfolio-wide view that tells leadership where delivery, revenue, and intervention risk stand right now.',
    proof:
      'Shows that the product starts with decision posture, not raw reporting.',
  },
  {
    step: '02',
    title: 'Move into delivery decisions',
    href: '/delivery',
    icon: Truck,
    description:
      'Use the field-control queue to show how slippage turns into one owner, one decision window, and one expected impact.',
    proof:
      'Proves operational discipline and accountability design.',
  },
  {
    step: '03',
    title: 'Escalate to strategic accounts',
    href: '/strategic',
    icon: Star,
    description:
      'Show how high-value orders are governed before revenue timing or customer confidence moves off plan.',
    proof:
      'Demonstrates commercial awareness, not just delivery tracking.',
  },
  {
    step: '04',
    title: 'Drill to one portfolio case',
    href: '/explorer',
    icon: Search,
    description:
      'Search for one project or customer and open a focused brief to show how executives move from portfolio view to one accountable conversation.',
    proof:
      'Shows that the control tower supports analysis, not only dashboards.',
  },
  {
    step: '05',
    title: 'Close with governance and rollout',
    href: '/methodology',
    icon: BookOpen,
    description:
      'Finish by showing why the numbers are governable and how the demo translates into a production operating model.',
    proof:
      'Answers the credibility question before it is asked.',
  },
  {
    step: '06',
    title: 'Anchor the production path',
    href: '/deployment',
    icon: Rocket,
    description:
      'Use the deployment roadmap to position the work as a realistic operating platform, not a one-off design exercise.',
    proof:
      'Demonstrates systems thinking and readiness for enterprise rollout.',
  },
] as const;

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

        <section className="space-y-4">
          <div className="section-divider">
            <span className="section-label">Leadership Walkthrough</span>
          </div>

          <div className="rounded-2xl border border-primary/12 bg-primary/5 p-4 md:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  Recommended sequence for executive readouts
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Use this flow when you need to explain the product clearly:
                  start with overall posture, move into operational decisions,
                  prove account-level drill-down, then close on governance and
                  rollout credibility.
                </p>
              </div>
              <Link
                href="/deployment"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Open production roadmap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {leadershipWalkthrough.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-xl border border-border/35 bg-background/30 p-4 transition-colors hover:border-border/55 hover:bg-background/45"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="rounded-full border border-border/40 bg-background/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/80">
                        Step {item.step}
                      </span>
                    </div>

                    <p className="mt-4 text-base font-semibold tracking-tight text-foreground/92">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="mt-4 rounded-lg border border-border/30 bg-background/30 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/72">
                        What this proves
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/88">
                        {item.proof}
                      </p>
                    </div>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5">
                      Open view
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

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
