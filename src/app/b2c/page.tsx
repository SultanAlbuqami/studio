"use client";

import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { KpiGovernancePanel } from '@/components/dashboard/kpi-governance-panel';
import { b2cSnapshotData, b2cWeeklyTrend } from '@/app/lib/dashboard-data';
import { kpiMetadata, b2cGovernanceKeys } from '@/app/lib/kpi-metadata';
import { Home, Clock, Smile, AlertTriangle } from 'lucide-react';
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
  const latestWeek = b2cWeeklyTrend[b2cWeeklyTrend.length - 1];
  const previousWeek = b2cWeeklyTrend[b2cWeeklyTrend.length - 2];
  const installDelta = latestWeek && previousWeek
    ? latestWeek.installs - previousWeek.installs
    : 0;
  const troubleAreas = b2cSnapshotData.areaPerformance.filter(
    (a) => a.status !== 'Under Control' && a.status !== 'Improving',
  );

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
              {troubleAreas.map((a) => `${a.area} (${a.status})`).join(', ')} — review resource allocation in the next B2C operations call.
            </p>
          </div>
        </div>
      )}

      {/* Weekly trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <YAxis domain={[4.0, 5.0]} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="csat" stroke="var(--color-csat)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-csat)' }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Area performance */}
      <Card className="executive-card">
        <div className="px-5 pt-5 pb-3">
          <p className="text-sm font-semibold">Installation by Area</p>
          <p className="text-xs text-muted-foreground mt-0.5">Residential coverage and network readiness</p>
        </div>
        <CardContent className="px-5 pb-5 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {b2cSnapshotData.areaPerformance.map((area) => (
              <div key={area.area} className="p-4 rounded-md bg-muted/15 border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold">{area.area}</p>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                    statusIndicator[area.status] ?? 'bg-muted/30 text-muted-foreground border-border/40'
                  }`}>
                    {area.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Demand</span>
                  <span className={`font-medium ${demandStyles[area.demand] ?? 'text-foreground'}`}>{area.demand}</span>
                </div>
              </div>
            ))}
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
