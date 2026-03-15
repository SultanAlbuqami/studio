'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  executionTrendChartData,
  portfolioDistributionData,
} from '@/app/lib/dashboard-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { ControlStatusOrb } from '@/components/dashboard/control-status-orb';

const executionConfig = {
  deliveries: {
    label: 'Actual',
    color: 'hsl(var(--chart-1))',
  },
  target: {
    label: 'Target',
    color: 'hsl(var(--muted-foreground) / 0.24)',
  },
} satisfies ChartConfig;

const statusToneClass: Record<string, string> = {
  'On Track': 'bg-emerald-400/10 text-emerald-200 border-emerald-400/18',
  'At Risk': 'bg-amber-400/10 text-amber-100 border-amber-400/18',
  Delayed: 'bg-rose-400/10 text-rose-100 border-rose-400/18',
};

export function PortfolioHealth() {
  const postureScore = portfolioDistributionData[0]?.value ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <Card className="executive-card lg:col-span-3">
        <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 pb-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/72">
              Execution pulse
            </p>
            <p className="mt-2 font-headline text-xl font-semibold tracking-[-0.04em] text-foreground">
              Weekly Execution Trend
            </p>
            <p className="mt-1 text-xs text-muted-foreground/72">
              Deliveries against target across the latest six weekly operating reviews.
            </p>
          </div>

          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/82">
            Live control view
          </span>
        </div>

        <CardContent className="px-5 pb-5 pt-0">
          <ChartContainer
            config={executionConfig}
            className="h-[280px] w-full"
            role="img"
            aria-label="Bar chart comparing weekly delivery actuals against target across six operating reviews."
          >
            <BarChart
              data={executionTrendChartData}
              margin={{ top: 16, right: 6, left: -22, bottom: 0 }}
            >
              <defs>
                <linearGradient id="execution-target" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(160, 174, 208, 0.52)" />
                  <stop offset="100%" stopColor="rgba(53, 70, 107, 0.18)" />
                </linearGradient>
                <linearGradient id="execution-actual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(129, 234, 255, 0.96)" />
                  <stop offset="100%" stopColor="rgba(73, 123, 255, 0.58)" />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="hsl(var(--border))"
                strokeDasharray="4 8"
                strokeOpacity={0.52}
              />
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
              <Bar
                dataKey="target"
                fill="url(#execution-target)"
                radius={[8, 8, 0, 0]}
                barSize={24}
              />
              <Bar
                dataKey="deliveries"
                fill="url(#execution-actual)"
                radius={[8, 8, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ChartContainer>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.2rem] border border-white/10 bg-background/35 px-3.5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Latest actual
              </p>
              <p className="mt-2 font-headline text-[1.65rem] font-semibold tracking-[-0.05em] text-foreground">
                {executionTrendChartData.at(-1)?.deliveries}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-background/35 px-3.5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Target band
              </p>
              <p className="mt-2 font-headline text-[1.65rem] font-semibold tracking-[-0.05em] text-foreground">
                {executionTrendChartData.at(-1)?.target}
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-background/35 px-3.5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Momentum
              </p>
              <p className="mt-2 font-headline text-[1.65rem] font-semibold tracking-[-0.05em] text-emerald-200">
                +7
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="executive-card lg:col-span-2">
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/72">
              Status shell
            </p>
            <p className="mt-2 font-headline text-xl font-semibold tracking-[-0.04em] text-foreground">
              Portfolio Status
            </p>
            <p className="mt-1 text-xs text-muted-foreground/72">
              Circular emphasis on the current operating mix, echoing the reference-style scan center.
            </p>
          </div>
        </div>

        <CardContent className="px-5 pb-5 pt-1">
          <div className="flex flex-col items-center gap-5">
            <div role="img" aria-label={`Portfolio status indicator showing ${postureScore}% of programs on track.`}>
              <ControlStatusOrb
                score={postureScore}
                label="On Track"
                caption="Active distribution"
                tone="stable"
                size="lg"
              />
            </div>

            <div className="w-full space-y-3">
              {portfolioDistributionData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-white/10 bg-background/35 px-3.5 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full shadow-[0_0_18px_rgba(74,177,255,0.28)]"
                      style={{ backgroundColor: item.fill }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground/92">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground/70">
                        Share of active customer programs
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold tabular-nums ${
                      statusToneClass[item.name] ?? 'border-white/10 bg-white/5 text-foreground/85'
                    }`}
                  >
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
