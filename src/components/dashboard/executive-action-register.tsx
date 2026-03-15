import Link from 'next/link';
import {
  executiveActionRegister,
  executiveActionSummary,
} from '@/app/lib/dashboard-data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Clock3, Target, User } from 'lucide-react';

const statusStyles = {
  ready: 'border-destructive/30 bg-destructive/12 text-destructive',
  mobilizing: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  tracking: 'border-primary/25 bg-primary/10 text-primary',
} as const;

const statusLabels = {
  ready: 'Assign now',
  mobilizing: 'Mobilizing',
  tracking: 'Track in forum',
} as const;

type ExecutiveActionRegisterProps = Readonly<{
  compact?: boolean;
}>;

export function ExecutiveActionRegister({
  compact = false,
}: ExecutiveActionRegisterProps) {
  if (compact) {
    const compactItems = executiveActionRegister.slice(0, 2);

    return (
      <Card className="executive-card overflow-hidden">
        <div className="border-b border-border/30 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Action Register</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/72">
                Owner-backed actions ready for leadership assignment.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              <span className="rounded-full border border-destructive/30 bg-destructive/12 px-2 py-1 font-semibold text-destructive">
                {executiveActionSummary.readyNow} ready
              </span>
              <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-1 font-semibold text-amber-300">
                {executiveActionSummary.mobilizing} mobilizing
              </span>
            </div>
          </div>
        </div>

        <CardContent className="space-y-2.5 p-3">
          {compactItems.map((item) => (
            <div
              key={item.id}
              className="rounded-[1rem] border border-border/30 bg-background/22 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13px] font-semibold leading-tight text-foreground">
                      {item.title}
                    </p>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${statusStyles[item.status]}`}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                    {item.action}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid gap-1.5 text-[11px] text-muted-foreground/76 sm:grid-cols-2">
                <div className="flex items-center gap-1.5">
                  <User className="h-3 w-3 text-primary" />
                  <span>{item.owner}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <Clock3 className="h-3 w-3 text-primary" />
                  <span>{item.dueLabel}</span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-[11px] text-muted-foreground/74">
                  {item.linkedKpi}
                </p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Open
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="executive-card overflow-hidden">
      <div className="border-b border-border/30 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Action Register</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/72">
              Owner-backed actions with linked KPIs and review forums — ready for leadership assignment.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            <span className="rounded-full border border-destructive/30 bg-destructive/12 px-2 py-1 font-semibold text-destructive">
              {executiveActionSummary.readyNow} ready
            </span>
            <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-1 font-semibold text-amber-300">
              {executiveActionSummary.mobilizing} mobilizing
            </span>
          </div>
        </div>
      </div>

      <CardContent className="space-y-2.5 p-3">
        {executiveActionRegister.map((item) => (
          <div
            key={item.id}
            className="rounded-[1.2rem] border border-border/35 bg-background/25 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13px] font-semibold leading-tight text-foreground">
                    {item.title}
                  </p>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${statusStyles[item.status]}`}
                  >
                    {statusLabels[item.status]}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {item.action}
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-[1rem] border border-white/10 bg-background/35 p-3">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/76">
                  <User className="h-3 w-3 text-primary" />
                  <span>{item.owner}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground/76">
                  <Clock3 className="h-3 w-3 text-primary" />
                  <span>{item.dueLabel}</span>
                </div>
              </div>
              <div className="rounded-[1rem] border border-white/10 bg-background/35 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                  Linked KPI
                </p>
                <p className="mt-2 text-[12px] text-foreground/90">
                  {item.linkedKpi}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-[1rem] border border-border/35 bg-background/30 p-3">
              <div className="flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-primary" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                  Outcome and forum
                </p>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-foreground/90">
                {item.outcome}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/76">
                Evidence: {item.evidence}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/76">
                Review forum: {item.forum}
              </p>
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
  );
}
