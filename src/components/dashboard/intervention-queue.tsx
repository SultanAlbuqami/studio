'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock3, ShieldAlert, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { executiveInterventions } from '@/app/lib/dashboard-data';

const priorityStyles = {
  critical: 'bg-destructive/12 text-destructive border-destructive/20',
  high: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  medium: 'bg-primary/10 text-primary border-primary/20',
} as const;

export function InterventionQueue() {
  const visibleInterventions = executiveInterventions.slice(0, 3);
  const hiddenCount = executiveInterventions.length - visibleInterventions.length;
  const [navigatingHref, setNavigatingHref] = useState<string | null>(null);

  return (
    <Card className="executive-card overflow-hidden">
      <div className="border-b border-border/30 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-3.5 w-3.5 text-primary" />
            <p className="text-sm font-semibold">Critical Interventions</p>
          </div>
          <span className="flex h-5 min-w-5 items-center justify-center rounded bg-destructive/15 px-1.5 text-[11px] font-bold tabular-nums text-destructive">
            {executiveInterventions.length}
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/74">
          Top three interventions by urgency. Each item requires PMO or executive sponsorship inside the current decision window.
        </p>
      </div>

      <CardContent className="space-y-2.5 p-3">
        {visibleInterventions.map((item) => {
          const isNavigating = navigatingHref === item.href;

          if (isNavigating) {
            return (
              <div key={item.title} className="rounded-lg border border-border/35 bg-background/25 p-2.5 space-y-2">
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-3 w-full" />
                <div className="flex gap-4 pt-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setNavigatingHref(item.href)}
              className="block rounded-lg border border-border/35 bg-background/25 p-2.5 transition-colors hover:bg-muted/10"
            >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13px] font-semibold leading-tight text-foreground">
                    {item.title}
                  </p>
                  <span
                    className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                      priorityStyles[item.priority]
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
            </div>

            <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/78">
                <User className="h-3 w-3 shrink-0" />
                <span>Accountable owner: {item.owner}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/78 sm:justify-end">
                <Clock3 className="h-3 w-3 shrink-0" />
                <span>Decision window: {item.timing}</span>
              </div>
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-foreground/80">
              <span className="font-semibold text-muted-foreground/70">
                Impact:
              </span>{' '}
              {item.impact}
            </p>
          </Link>
          );
        })}

        <div className="border-t border-border/30 px-1 pt-2">
          {hiddenCount > 0 && (
            <p className="mb-1 text-[10px] text-muted-foreground/68">
              Showing top {visibleInterventions.length} of{' '}
              {executiveInterventions.length} active interventions.
            </p>
          )}
          <Link
            href="/escalations"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Open the full recovery backlog and SLA risk view
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
