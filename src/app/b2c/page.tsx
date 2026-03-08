"use client";

import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { KpiGovernancePanel } from '@/components/dashboard/kpi-governance-panel';
import { b2cSnapshotData, b2cWeeklyTrend } from '@/app/lib/dashboard-data';
import { kpiMetadata, b2cGovernanceKeys } from '@/app/lib/kpi-metadata';
import {
  ArrowRight,
  AlertTriangle,
  Clock,
  Home,
  ShieldAlert,
  Smile,
  Users,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const demandStyles: Record<string, string> = {
  'Very High': 'text-rose-400',
  High: 'text-orange-400',
  Medium: 'text-primary',
};

const statusIndicator: Record<string, string> = {
  'Under Control': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Improving: 'bg-primary/10 text-primary border-primary/20',
  'Technician Shortage': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const areaOperatingPlan: Record<string, { owner: string; action: string; window: string }> = {
  'Al-Malqa (Riyadh)': {
    owner: 'B2C Operations Lead',
    action: 'Keep technician capacity aligned to demand while preserving appointment quality on the Riyadh west cluster.',
    window: 'Weekly B2C operations review',
  },
  'Al-Rawdah (Jeddah)': {
    owner: 'Regional Dispatch Supervisor',
    action: 'Lock the improving dispatch posture for another week so the queue does not swing back into rework.',
    window: 'Next 72h',
  },
  'Al-Faisaliyah (Dammam)': {
    owner: 'Installation Operations Manager',
    action: 'Deploy a temporary recovery crew and rebalance appointment slots before lead-time drift converts into cancellations.',
    window: 'Daily dispatch review',
  },
};

const installChartConfig = {
  installs: {
    label: "Installs",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const csatChartConfig = {
  csat: {
    label: "CSAT",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function B2CPage() {
  const latestWeek = b2cWeeklyTrend.at(-1);
  const previousWeek = b2cWeeklyTrend.at(-2);
  const installDelta = latestWeek && previousWeek
    ? latestWeek.installs - previousWeek.installs
    : 0;
  const csatDelta = latestWeek && previousWeek
    ? Number((latestWeek.csat - previousWeek.csat).toFixed(1))
    : 0;
  const troubleAreas = b2cSnapshotData.areaPerformance.filter(
    (a) => a.status !== 'Under Control' && a.status !== 'Improving',
  );
  const latestInstallRunRate = latestWeek?.installs ?? 0;
  const backlogCoverageWeeks = latestInstallRunRate > 0
    ? (b2cSnapshotData.pendingInstallations / latestInstallRunRate).toFixed(1)
    : '0.0';
  const constrainedAreaShare = Math.round(
    (troubleAreas.length / b2cSnapshotData.areaPerformance.length) * 100,
  );
  const priorityArea = troubleAreas[0] ?? b2cSnapshotData.areaPerformance[0];
  const priorityPlan = areaOperatingPlan[priorityArea.area];

  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="B2C Fulfillment" subtitle="Consumer Operations" />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label={kpiMetadata.homeFiberSubs.label}
          value={b2cSnapshotData.activeHomeFiberSubs.toLocaleString()}
          icon={Home}
          variant="spotlight"
        />
        <KpiCard
          label={kpiMetadata.pendingInstalls.label}
          value={b2cSnapshotData.pendingInstallations.toLocaleString()}
          icon={Clock}
          variant="spotlight"
          className="border-amber-500/15"
        />
        <KpiCard
          label={kpiMetadata.avgInstallTime.label}
          value={`${b2cSnapshotData.averageTimeToInstall}d`}
          icon={Clock}
          trend={{ value: "-0.5d", positive: true }}
          variant="spotlight"
        />
        <KpiCard
          label={kpiMetadata.b2cCsat.label}
          value={`${b2cSnapshotData.customerSatisfactionScore}/5`}
          icon={Smile}
          variant="spotlight"
        />
      </section>

      {/* Operational insight strip */}
      {troubleAreas.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-foreground">
              {troubleAreas.length} area{troubleAreas.length > 1 ? 's' : ''} flagged
            </p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
              {troubleAreas.map((a) => `${a.area} (${a.status})`).join(', ')}. Rebalance dispatch capacity before backlog pressure spills into missed appointments and cancellation risk.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-2">
          <Card className="executive-card">
            <div className="px-5 pt-5 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Install Velocity</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Weekly completed installations — last 6 weeks</p>
                </div>
                {installDelta !== 0 && (
                  <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                    installDelta > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {installDelta > 0 ? '+' : ''}{installDelta} WoW
                  </span>
                )}
              </div>
            </div>
            <CardContent className="px-5 pb-5 pt-0">
              <ChartContainer config={installChartConfig} className="h-[200px] w-full">
                <BarChart data={b2cWeeklyTrend} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="installs" fill="var(--color-installs)" radius={[3, 3, 0, 0]} barSize={28} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="executive-card">
            <div className="px-5 pt-5 pb-2">
              <p className="text-sm font-semibold">CSAT Trend</p>
              <p className="text-xs text-muted-foreground mt-0.5">Customer satisfaction score — last 6 weeks</p>
            </div>
            <CardContent className="px-5 pb-5 pt-0">
              <ChartContainer config={csatChartConfig} className="h-[200px] w-full">
                <LineChart data={b2cWeeklyTrend} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <YAxis domain={[4, 5]} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="csat" stroke="var(--color-csat)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-csat)' }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="executive-card lg:col-span-2 xl:col-span-2">
            <div className="px-5 pt-5 pb-3">
              <p className="text-sm font-semibold">Consumer Fulfillment Decision Lens</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Director-level view of backlog pressure, dispatch ownership, and customer-promise risk.
              </p>
            </div>
            <CardContent className="px-5 pb-5 pt-0 space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                  <p className="section-label">Backlog Cover</p>
                  <p className="mt-2 text-2xl font-bold tabular-nums">{backlogCoverageWeeks} wks</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    At the latest install run rate of {latestInstallRunRate} completions per week.
                  </p>
                </div>
                <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
                  <p className="section-label">Dispatch Pressure</p>
                  <p className="mt-2 text-2xl font-bold tabular-nums text-amber-400">{constrainedAreaShare}%</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Of tracked areas need intervention to protect the install promise.
                  </p>
                </div>
                <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                  <p className="section-label">Customer Posture</p>
                  <p className="mt-2 text-2xl font-bold tabular-nums">{latestWeek?.csat ?? 0}/5</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {csatDelta >= 0 ? 'Stable to improving' : 'Softening'} versus the previous week.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-md border border-border/30 bg-background/30 p-4">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-3.5 w-3.5 text-primary" />
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Immediate Intervention
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground/90">
                    {priorityArea.area}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {priorityPlan.action}
                  </p>
                </div>

                <div className="rounded-md border border-border/30 bg-background/30 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Operating Ownership
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Accountable Owner
                      </p>
                      <p className="mt-1 text-sm text-foreground/90">{priorityPlan.owner}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Next Review Window
                      </p>
                      <p className="mt-1 text-sm text-foreground/90">{priorityPlan.window}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-border/30 pt-3">
                    <p className="text-[11px] text-muted-foreground/72">
                      Keep backlog recovery and customer messaging under one operating owner.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                      Dispatch review
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="executive-card h-fit">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">B2C Intervention Board</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Decision support for dispatch, appointment assurance, and escalation ownership.
            </p>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-3">
            {[
              {
                title: 'Backlog clearance',
                detail: `${b2cSnapshotData.pendingInstallations.toLocaleString()} installs remain open. Hold the recovery cell until the backlog cover is below 3.5 weeks.`,
                owner: 'Installation Operations Manager',
              },
              {
                title: 'Appointment assurance',
                detail: `Keep post-install CSAT at ${b2cSnapshotData.customerSatisfactionScore}/5 or above while the queue is recovering, otherwise the speed gain will not be commercially credible.`,
                owner: 'Customer Experience Lead',
              },
              {
                title: 'Area prioritization',
                detail: `${priorityArea.area} is the active recovery pocket. Protect same-week appointment slots for the highest-demand neighborhoods first.`,
                owner: priorityPlan.owner,
              },
            ].map((item, index) => (
              <div key={item.title} className="rounded-md border border-border/30 bg-muted/10 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground/90">{item.title}</p>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                    P{index + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                <p className="mt-3 text-[11px] text-muted-foreground/78">
                  Accountable owner: <span className="text-foreground/88">{item.owner}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="executive-card">
        <div className="px-5 pt-5 pb-3">
          <p className="text-sm font-semibold">Area Dispatch Watchlist</p>
          <p className="text-xs text-muted-foreground mt-0.5">Demand posture, operating ownership, and next intervention by area</p>
        </div>
        <CardContent className="px-5 pb-5 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {b2cSnapshotData.areaPerformance.map((area) => {
              const plan = areaOperatingPlan[area.area];

              return (
              <div key={area.area} className="rounded-md border border-border/30 bg-muted/15 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold">{area.area}</p>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                    statusIndicator[area.status] ?? 'bg-muted/30 text-muted-foreground border-border/40'
                  }`}>
                    {area.status}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Demand</span>
                    <span className={`font-medium ${demandStyles[area.demand] ?? 'text-foreground'}`}>{area.demand}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Accountable Owner
                    </p>
                    <p className="mt-1 text-sm text-foreground/90">{plan.owner}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      Next Action
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{plan.action}</p>
                  </div>
                  <div className="rounded-md border border-border/30 bg-background/35 px-3 py-2 text-[11px] text-muted-foreground/78">
                    Review window: <span className="text-foreground/88">{plan.window}</span>
                  </div>
                </div>
              </div>
            );})}
          </div>
        </CardContent>
      </Card>

      <KpiGovernancePanel
        title="B2C Governance"
        description="Thresholds, accountable owners, and review forums for consumer fulfillment KPIs."
        keys={b2cGovernanceKeys}
      />
    </div>
  );
}
