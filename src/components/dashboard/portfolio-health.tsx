"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { executionTrendChartData, portfolioDistributionData } from '@/app/lib/dashboard-data';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
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
  type ChartConfig
} from '@/components/ui/chart';

const executionConfig = {
  deliveries: {
    label: "Actual Deliveries",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target Deliveries",
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
    color: "hsl(var(--chart-2))",
  },
  "Delayed": {
    label: "Delayed",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

export function PortfolioHealth() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 executive-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Weekly Execution Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={executionConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executionTrendChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="deliveries" 
                  fill="var(--color-deliveries)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32}
                />
                <Bar 
                  dataKey="target" 
                  fill="var(--color-target)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="executive-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Portfolio Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={distributionConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioDistributionData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                  nameKey="name"
                >
                  {portfolioDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend 
                  content={<ChartLegendContent />} 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
