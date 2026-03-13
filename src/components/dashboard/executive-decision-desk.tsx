import Link from 'next/link';
import {
  executiveDecisionQueue,
  type ExecutiveDecisionCard,
} from '@/app/lib/dashboard-data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Clock3, MapPin, User } from 'lucide-react';

const priorityStyles = {
  critical: 'border-destructive/30 bg-destructive/12 text-destructive',
  high: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  medium: 'border-primary/25 bg-primary/10 text-primary',
} as const;

const domainLabels: Record<ExecutiveDecisionCard['domain'], string> = {
  delivery: 'Delivery',
  strategic: 'Strategic',
  booking: 'Booking',
};

export function ExecutiveDecisionDesk() {
  const visibleDecisions = executiveDecisionQueue.slice(0, 2);
  const criticalCount = visibleDecisions.filter(
    (item) => item.priority === 'critical',
  ).length;

  return (
    <Card className="executive-card overflow-hidden">
      <div className="border-b border-border/30 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <p className="section-label">Decision Queue</p>
            <h2 className="mt-2 font-headline text-[1.5rem] font-semibold tracking-[-0.05em] text-foreground">
              Leadership calls that still change the outcome
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">
              Each card ties one operating signal to a decision, accountable
              owner, review forum, and expected commercial or customer effect.
            </p>
          </div>

          <div className="grid min-w-[220px] gap-2 sm:grid-cols-2">
            <div className="rounded-[1.1rem] border border-white/8 bg-background/28 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Live decisions
              </p>
              <p className="mt-2 font-headline text-2xl font-semibold tracking-[-0.05em] text-foreground">
                {visibleDecisions.length}
              </p>
            </div>
            <div className="rounded-[1.1rem] border border-white/8 bg-background/28 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Critical now
              </p>
              <p className="mt-2 font-headline text-2xl font-semibold tracking-[-0.05em] text-destructive">
                {criticalCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 md:p-5">
        <div className="grid gap-3 xl:grid-cols-2">
          {visibleDecisions.map((item) => (
            <article
              key={item.id}
              className="rounded-[1.25rem] border border-border/35 bg-background/22 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-background/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/80">
                  {domainLabels[item.domain]}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${priorityStyles[item.priority]}`}
                >
                  {item.priority}
                </span>
                <span className="text-[11px] text-muted-foreground/72">
                  {item.region} · {item.decisionWindow}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <h3 className="text-base font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 rounded-[1rem] border border-primary/12 bg-primary/[0.05] p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/74">
                  Decision Required
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/92">
                  {item.decision}
                </p>
              </div>

              <div className="mt-4 grid gap-2 text-[11px] text-muted-foreground/78 sm:grid-cols-3">
                <div className="flex items-center gap-1.5 rounded-[0.95rem] border border-white/8 bg-background/24 px-3 py-2.5">
                  <User className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{item.owner}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-[0.95rem] border border-white/8 bg-background/24 px-3 py-2.5">
                  <Clock3 className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{item.decisionWindow}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-[0.95rem] border border-white/8 bg-background/24 px-3 py-2.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{item.reviewForum}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                  Evidence
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.evidence.slice(0, 2).map((evidence) => (
                    <span
                      key={evidence}
                      className="rounded-full border border-white/10 bg-background/55 px-2.5 py-1 text-[11px] text-foreground/86"
                    >
                      {evidence}
                    </span>
                  ))}
                  {item.evidence.length > 2 && (
                    <span className="rounded-full border border-white/10 bg-background/45 px-2.5 py-1 text-[11px] text-muted-foreground/76">
                      +{item.evidence.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-[1rem] border border-border/30 bg-background/24 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                  Expected impact
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {item.impact}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/78">
                  Next milestone: {item.nextMilestone}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/30 pt-3">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Open decision view
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {item.linkedViewHref && item.linkedViewLabel && (
                  <Link
                    href={item.linkedViewHref}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.linkedViewLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
