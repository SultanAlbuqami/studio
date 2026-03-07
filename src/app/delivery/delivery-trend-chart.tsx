"use client";

import { Card, CardContent } from '@/components/ui/card';
import {
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

const trendConfig = {
  days: {
    label: "Cycle Time (days)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface DeliveryTrendChartProps {
  readonly data: { month: string; days: number }[];
}

export function DeliveryTrendChart({ data }: DeliveryTrendChartProps) {
  return (
    <Card className="executive-card">
      <div className="px-5 pt-5 pb-2">
        <p className="text-sm font-semibold">Order-to-Activate Trend</p>
        <p className="text-xs text-muted-foreground mt-0.5">Avg cycle time — last 6 months</p>
      </div>
      <CardContent className="px-5 pb-5 pt-0">
        <ChartContainer config={trendConfig} className="h-[160px] w-full">
          <LineChart data={data} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <YAxis
              domain={[40, 50]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="days"
              stroke="var(--color-days)"
              strokeWidth={2}
              dot={{ r: 3, fill: 'var(--color-days)' }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
