"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  type ChartConfig
} from '@/components/ui/chart';

const executionConfig = {
  deliveries: {
    label: "التنفيذ الفعلي",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "المستهدف",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig;

const distributionConfig = {
  "On Track": {
    label: "في المسار",
    color: "hsl(var(--chart-1))",
  },
  "At Risk": {
    label: "تحت المخاطرة",
    color: "hsl(var(--chart-2))",
  },
  "Delayed": {
    label: "متأخر",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

export function PortfolioHealth() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 executive-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">اتجاه التنفيذ الأسبوعي</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={executionConfig} className="h-[300px] w-full">
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
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="executive-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">توزيع حالة المحفظة</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={distributionConfig} className="h-[300px] w-full">
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
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
