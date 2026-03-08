'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FocusDetail } from '@/app/lib/dashboard-data';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarClock, ShieldCheck, User } from 'lucide-react';

const metricToneStyles = {
  default: 'text-foreground',
  positive: 'text-emerald-400',
  warning: 'text-amber-400',
  critical: 'text-destructive',
} as const;

type FocusDetailSheetProps = Readonly<{
  detail: FocusDetail | null;
  clearHref: string;
}>;

export function FocusDetailSheet({
  detail,
  clearHref,
}: FocusDetailSheetProps) {
  const router = useRouter();
  const [open, setOpen] = useState(Boolean(detail));

  useEffect(() => {
    setOpen(Boolean(detail));
  }, [detail]);

  if (!detail) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen) {
          router.replace(clearHref, { scroll: false });
        }
      }}
    >
      <SheetContent
        side="right"
        className="w-full border-border bg-card p-0 sm:max-w-xl"
      >
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="space-y-3 border-b border-border/30 pb-5 text-left">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] uppercase tracking-widest">
                  {detail.eyebrow}
                </Badge>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                  Focused view
                </span>
              </div>
              <div>
                <SheetTitle className="text-xl font-semibold tracking-tight">
                  {detail.title}
                </SheetTitle>
                <SheetDescription className="mt-1 text-sm text-muted-foreground">
                  {detail.subtitle}
                </SheetDescription>
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {detail.summary}
              </p>
            </SheetHeader>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {detail.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-border/30 bg-muted/10 p-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {metric.label}
                  </p>
                  <p
                    className={`mt-2 text-lg font-semibold tracking-tight ${
                      metricToneStyles[metric.tone ?? 'default']
                    }`}
                  >
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-border/30 bg-muted/10 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Operating Context
                </p>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {detail.facts.map((fact, index) => (
                  <div key={`${fact.label}-${index}`}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-border/30 bg-muted/10 p-4">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-3.5 w-3.5 text-primary" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Immediate Actions
                </p>
              </div>
              <div className="mt-3 space-y-3">
                {detail.actions.map((action) => (
                  <div key={action} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {detail.relatedOrders && detail.relatedOrders.length > 0 && (
              <div className="mt-5 rounded-lg border border-border/30 bg-muted/10 p-4">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Related Orders
                  </p>
                </div>
                <div className="mt-3 space-y-3">
                  {detail.relatedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-md border border-border/30 bg-background/40 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-muted-foreground">
                              {order.id}
                            </span>
                            <Badge
                              variant={
                                order.status === 'On Track'
                                  ? 'default'
                                  : 'destructive'
                              }
                              className="text-[10px]"
                            >
                              {order.status === 'On Track' ? 'Stable' : order.status}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm font-medium">
                            {order.account}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {order.service}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold tabular-nums">
                            {order.value}
                          </p>
                          <div className="mt-1 flex items-center gap-1.5">
                            <div className="h-1.5 w-14 rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${order.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-muted-foreground tabular-nums">
                              {order.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
