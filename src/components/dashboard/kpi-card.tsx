import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  subValue?: string;
  /** "spotlight" = hero-weight metric, "compact" = secondary row */
  variant?: 'spotlight' | 'compact';
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  className,
  subValue,
  variant = 'compact',
}: Readonly<KpiCardProps>) {
  const isSpotlight = variant === 'spotlight';

  return (
    <div
      className={cn(
        'executive-card',
        isSpotlight ? 'p-5 md:p-6' : 'p-4',
        className,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className={cn(
          'flex items-center justify-center rounded-md bg-muted/50',
          isSpotlight ? 'h-9 w-9' : 'h-7 w-7',
        )}>
          <Icon className={cn(
            'text-muted-foreground',
            isSpotlight ? 'w-4.5 h-4.5' : 'w-3.5 h-3.5',
          )} />
        </div>
        {trend && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center rounded px-1.5 py-0.5 font-semibold tabular-nums',
              isSpotlight ? 'text-xs' : 'text-[11px]',
              trend.positive
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400',
            )}
          >
            {trend.value}
          </span>
        )}
      </div>

      <p className={cn(
        'font-semibold uppercase tracking-widest text-muted-foreground leading-4 text-balance',
        isSpotlight ? 'text-[11px] mb-1' : 'text-[10px] mb-0.5',
      )}>
        {label}
      </p>

      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
        <span className={cn(
          'font-bold tracking-tight tabular-nums leading-none',
          isSpotlight ? 'text-3xl' : 'text-xl',
        )}>
          {value}
        </span>
        {subValue && (
          <span className="text-xs uppercase tracking-wide text-muted-foreground/80">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
}