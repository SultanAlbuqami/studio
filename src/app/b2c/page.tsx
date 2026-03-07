"use client";

import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { b2cSnapshotData, b2cWeeklyTrend } from '@/app/lib/dashboard-data';
import { Home, Clock, Smile } from 'lucide-react';
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
  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="B2C Fulfillment" subtitle="Consumer Operations" />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Home Fiber Subs" value={b2cSnapshotData.activeHomeFiberSubs.toLocaleString()} icon={Home} variant="spotlight" />
        <KpiCard label="Pending Installs" value={b2cSnapshotData.pendingInstallations.toLocaleString()} icon={Clock} variant="spotlight" />
        <KpiCard label="Avg Install Time" value={`${b2cSnapshotData.averageTimeToInstall}d`} icon={Clock} trend={{ value: "-0.5d", positive: true }} variant="spotlight" />
        <KpiCard label="CSAT Score" value={`${b2cSnapshotData.customerSatisfactionScore}/5`} icon={Smile} variant="spotlight" />
      </section>

      {/* Weekly trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="executive-card">
          <div className="px-5 pt-5 pb-2">
            <p className="text-sm font-semibold">Install Velocity</p>
            <p className="text-xs text-muted-foreground mt-0.5">Weekly completed installations — last 6 weeks</p>
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
                <p className="text-sm font-semibold mb-3">{area.area}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Demand</span>
                    <span className={`font-medium ${demandStyles[area.demand] ?? 'text-foreground'}`}>{area.demand}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{area.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
