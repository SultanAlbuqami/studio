import { kpiMetadata, type KpiMetadataKey } from '@/app/lib/kpi-metadata';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Database, ShieldCheck, Target, Users } from 'lucide-react';

type KpiGovernancePanelProps = Readonly<{
  title: string;
  description: string;
  keys: readonly KpiMetadataKey[];
  className?: string;
  compact?: boolean;
}>;

export function KpiGovernancePanel({
  title,
  description,
  keys,
  className,
  compact = false,
}: KpiGovernancePanelProps) {
  return (
    <Card className={cn('executive-card', className)}>
      <div className="px-5 pt-5 pb-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <CardContent className="px-5 pb-5 pt-0">
        <div
          className={cn(
            'grid gap-3',
            compact ? 'md:grid-cols-3' : 'md:grid-cols-2 2xl:grid-cols-4',
          )}
        >
          {keys.map((key) => {
            const meta = kpiMetadata[key];

            return (
              <div
                key={key}
                className={cn(
                  'rounded-md border border-border/30 bg-muted/10',
                  compact ? 'p-2.5' : 'p-3',
                )}
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {meta.label}
                </p>

                <div
                  className={cn(
                    compact ? 'mt-2.5 space-y-1.5 text-[13px]' : 'mt-3 space-y-2 text-sm',
                  )}
                >
                  <div className="flex items-start gap-2">
                    <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Threshold
                      </p>
                      <p className="mt-1 text-foreground/90">{meta.threshold}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Source
                      </p>
                      <p className="mt-1 text-muted-foreground">{meta.source}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Owner
                      </p>
                      <p className="mt-1 text-foreground/90">{meta.owner}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        Review Forum
                      </p>
                      <p className="mt-1 text-muted-foreground">{meta.forum}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
