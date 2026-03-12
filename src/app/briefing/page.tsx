import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import {
  accountRiskProfiles,
  dashboardData,
  dataConfidenceLedger,
  executiveActionRegister,
  executiveDecisionQueue,
  executiveScenarios,
} from '@/app/lib/dashboard-data';
import { BriefingPrintActions } from '@/components/briefing-print-actions';
import { ArrowRight, ShieldCheck, Target } from 'lucide-react';

export default function BriefingPage() {
  const topDecisions = executiveDecisionQueue.slice(0, 3);
  const topActions = executiveActionRegister.slice(0, 4);
  const primaryScenario = executiveScenarios[0];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-5 py-6 md:px-8 md:py-8">
      <div className="flex justify-end">
        <BriefingPrintActions />
      </div>

      <DashboardHeader
        title="VP Briefing Pack"
        subtitle="Executive review mode"
        hideFilters
        description="Condensed leadership view for portfolio posture, exposed value, decision ownership, and the next actions that can still move the quarter."
        highlights={[
          { label: 'Use case', value: 'Leadership review, sponsor call, print pack' },
          { label: 'Focus', value: 'Decisions, owners, commercial effect' },
          { label: 'Style', value: 'Deliberately short and meeting-ready' },
        ]}
        note="This view compresses the operating model into one executive page: what is exposed, what must be decided now, who owns it, and why leadership should trust the numbers."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="executive-card p-4">
          <p className="section-label">Revenue at risk</p>
          <p className="mt-2 font-headline text-3xl font-semibold tracking-[-0.05em] text-destructive">
            {(dashboardData.revenueAtRisk / 1_000_000).toFixed(1)}M
          </p>
          <p className="mt-1 text-xs text-muted-foreground">SAR currently exposed</p>
        </Card>
        <Card className="executive-card p-4">
          <p className="section-label">On-time delivery</p>
          <p className="mt-2 font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {dashboardData.onTimeDeliveryPercentage}%
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Portfolio-level OTD posture</p>
        </Card>
        <Card className="executive-card p-4">
          <p className="section-label">Pending acceptance</p>
          <p className="mt-2 font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {dashboardData.acceptancePending}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Items awaiting sign-off</p>
        </Card>
        <Card className="executive-card p-4">
          <p className="section-label">Operating priorities</p>
          <p className="mt-2 font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {topDecisions.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Leadership calls live in this pack</p>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="executive-card overflow-hidden">
          <div className="border-b border-border/30 px-5 py-4">
            <p className="section-label">Today&apos;s calls</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Three decisions that merit VP attention
            </h2>
          </div>
          <CardContent className="space-y-3 p-4">
            {topDecisions.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.25rem] border border-border/35 bg-background/25 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-background/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/78">
                    {item.region}
                  </span>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/78">
                    {item.decisionWindow}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.decision}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-[1rem] border border-white/10 bg-background/35 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                      Owner
                    </p>
                    <p className="mt-2 text-sm text-foreground/90">{item.owner}</p>
                  </div>
                  <div className="rounded-[1rem] border border-white/10 bg-background/35 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                      Effect if approved
                    </p>
                    <p className="mt-2 text-sm text-foreground/90">{item.impact}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Open supporting view
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="executive-card overflow-hidden">
          <div className="border-b border-border/30 px-5 py-4">
            <p className="section-label">Owner register</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Actions leadership can assign live
            </h2>
          </div>
          <CardContent className="space-y-3 p-4">
            {topActions.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.15rem] border border-border/35 bg-background/25 p-3"
              >
                <p className="text-sm font-semibold leading-snug text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {item.action}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground/78">
                  <span className="rounded-full border border-white/10 bg-background/55 px-2 py-1">
                    {item.owner}
                  </span>
                  <span className="rounded-full border border-white/10 bg-background/55 px-2 py-1">
                    {item.dueLabel}
                  </span>
                  <span className="rounded-full border border-white/10 bg-background/55 px-2 py-1">
                    {item.linkedKpi}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="executive-card overflow-hidden">
          <div className="border-b border-border/30 px-5 py-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <div>
                <p className="section-label">Preferred move</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  Scenario with the fastest value release
                </h2>
              </div>
            </div>
          </div>
          <CardContent className="space-y-3 p-4">
            <div className="rounded-[1.2rem] border border-primary/15 bg-primary/[0.06] p-4">
              <p className="text-base font-semibold text-foreground">
                {primaryScenario.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/88">
                {primaryScenario.summary}
              </p>
            </div>

            {primaryScenario.effects.map((effect) => (
              <div
                key={effect.label}
                className="rounded-[1rem] border border-border/35 bg-background/25 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground/90">
                    {effect.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {effect.projected}
                    {effect.unit === '%' ? '%' : effect.unit === 'M SAR' ? ` ${effect.unit}` : effect.unit ?? ''}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="executive-card overflow-hidden">
          <div className="border-b border-border/30 px-5 py-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <div>
                <p className="section-label">Why trust this page</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  Governance and exposure summary
                </h2>
              </div>
            </div>
          </div>
          <CardContent className="grid gap-3 p-4 md:grid-cols-2">
            <div className="space-y-3">
              {dataConfidenceLedger.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1rem] border border-border/35 bg-background/25 p-3"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/92">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {accountRiskProfiles.map((item) => (
                <div
                  key={item.focusId}
                  className="rounded-[1rem] border border-border/35 bg-background/25 p-3"
                >
                  <p className="text-sm font-semibold leading-snug text-foreground">
                    {item.accountName}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                    {item.riskReason}
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-destructive">
                    {(item.revenueImpact / 1_000_000).toFixed(1)}M SAR impact
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
