"use client";

import { Card, CardContent } from '@/components/ui/card';
import { executionTrendChartData, portfolioDistributionData } from '@/app/lib/dashboard-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';

const executionConfig = {
  deliveries: {
    label: "Actual",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig;

const distributionConfig = {
  "On Track": {
    label: "On Track",
    color: "hsl(var(--chart-1))",
  },
  "At Risk": {
    label: "At Risk",
    color: "hsl(var(--chart-4))",
  },
  "Delayed": {
    label: "Delayed",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

export function PortfolioHealth() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

      {/* Execution Trend — primary chart */}
      <Card className="lg:col-span-3 executive-card">
        <div className="px-5 pt-5 pb-2">
          <p className="text-sm font-semibold">Weekly Execution Trend</p>
          <p className="text-xs text-muted-foreground mt-0.5">Deliveries vs. target — last 6 weeks</p>
        </div>
        <CardContent className="px-5 pb-5 pt-0">
          <ChartContainer config={executionConfig} className="h-[260px] w-full">
            <BarChart data={executionTrendChartData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="target"
                fill="var(--color-target)"
                radius={[3, 3, 0, 0]}
                barSize={22}
              />
              <Bar
                dataKey="deliveries"
                fill="var(--color-deliveries)"
                radius={[3, 3, 0, 0]}
                barSize={22}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Portfolio Distribution — donut with summary */}
      <Card className="lg:col-span-2 executive-card">
        <div className="px-5 pt-5 pb-2">
          <p className="text-sm font-semibold">Portfolio Status</p>
          <p className="text-xs text-muted-foreground mt-0.5">Active order distribution</p>
        </div>
        <CardContent className="px-5 pb-5 pt-0">
          <ChartContainer config={distributionConfig} className="h-[200px] w-full">
            <PieChart>
              <Pie
                data={portfolioDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                strokeWidth={0}
              >
                {portfolioDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              {/* Center label */}
              <text x="50%" y="46%" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-2xl font-bold">
                {portfolioDistributionData[0].value}%
              </text>
              <text x="50%" y="58%" textAnchor="middle" dominantBaseline="central" className="fill-muted-foreground text-[10px]">
                {portfolioDistributionData[0].name}
              </text>
            </PieChart>
          </ChartContainer>

          {/* Inline legend with values */}
          <div className="space-y-2 mt-2">
            {portfolioDistributionData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.fill }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-semibold tabular-nums">{d.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
