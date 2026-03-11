import type { FocusDetail } from '@/app/lib/dashboard-data';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarClock, ShieldCheck, User, X } from 'lucide-react';

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
  if (!detail) return null;

  return (
    <>
      <Link
        href={clearHref}
        scroll={false}
        aria-label="Close focus detail"
        className="fixed inset-0 z-50 bg-black/78 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={`focus-sheet-title-${detail.id}`}
        className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-full flex-col border-l border-border bg-card shadow-[0_30px_80px_rgba(2,6,23,0.55)] sm:max-w-xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border/30 px-6 py-5">
          <div className="min-w-0 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase tracking-widest">
                {detail.eyebrow}
              </Badge>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                Focused view
              </span>
            </div>
            <div>
              <h2
                id={`focus-sheet-title-${detail.id}`}
                className="text-xl font-semibold tracking-tight"
              >
                {detail.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {detail.subtitle}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-foreground/85">
              {detail.summary}
            </p>
          </div>

          <Link
            href={clearHref}
            scroll={false}
            className="rounded-md border border-border/40 bg-background/30 p-2 text-muted-foreground transition-colors hover:bg-muted/20 hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2">
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
      </aside>
    </>
  );
}
