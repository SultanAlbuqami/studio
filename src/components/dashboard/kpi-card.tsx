import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type KpiTone = 'primary' | 'success' | 'warning' | 'critical' | 'neutral';

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
  variant?: 'spotlight' | 'compact';
  tone?: KpiTone;
}

const toneConfig: Record<
  KpiTone,
  {
    iconShell: string;
    iconColor: string;
    accentGlow: string;
    border: string;
    label: string;
  }
> = {
  primary: {
    iconShell: 'border-primary/20 bg-primary/10',
    iconColor: 'text-primary',
    accentGlow: 'from-sky-400/22 via-cyan-400/10 to-transparent',
    border: 'border-primary/18',
    label: 'Signal locked',
  },
  success: {
    iconShell: 'border-emerald-400/20 bg-emerald-400/10',
    iconColor: 'text-emerald-300',
    accentGlow: 'from-emerald-400/22 via-emerald-300/10 to-transparent',
    border: 'border-emerald-400/18',
    label: 'Advancing',
  },
  warning: {
    iconShell: 'border-amber-400/20 bg-amber-400/10',
    iconColor: 'text-amber-200',
    accentGlow: 'from-amber-400/22 via-amber-300/10 to-transparent',
    border: 'border-amber-400/18',
    label: 'Needs attention',
  },
  critical: {
    iconShell: 'border-rose-400/20 bg-rose-400/10',
    iconColor: 'text-rose-200',
    accentGlow: 'from-rose-400/24 via-rose-300/10 to-transparent',
    border: 'border-rose-400/18',
    label: 'Priority signal',
  },
  neutral: {
    iconShell: 'border-white/10 bg-white/5',
    iconColor: 'text-foreground/72',
    accentGlow: 'from-white/14 via-white/6 to-transparent',
    border: 'border-white/10',
    label: 'Monitoring',
  },
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  className,
  subValue,
  variant = 'compact',
  tone = 'primary',
}: Readonly<KpiCardProps>) {
  const isSpotlight = variant === 'spotlight';
  const style = toneConfig[tone];

  return (
    <div
      className={cn(
        'executive-card group isolate',
        isSpotlight ? 'min-h-[168px] p-5 md:p-6' : 'min-h-[148px] p-4',
        style.border,
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90',
          style.accentGlow,
        )}
      />

      <div className="mb-5 flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex items-center justify-center rounded-[1rem] border shadow-[0_0_28px_rgba(59,130,246,0.12)]',
            isSpotlight ? 'h-12 w-12' : 'h-10 w-10',
            style.iconShell,
          )}
        >
          <Icon
            className={cn(
              isSpotlight ? 'h-5 w-5' : 'h-[18px] w-[18px]',
              style.iconColor,
            )}
          />
        </div>

        <div className="flex flex-col items-end gap-2">
          {trend && (
            <span
              className={cn(
                'inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 font-semibold tabular-nums shadow-[0_0_20px_rgba(2,6,23,0.2)]',
                isSpotlight ? 'text-xs' : 'text-[11px]',
                trend.positive
                  ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
                  : 'border-rose-400/20 bg-rose-400/10 text-rose-200',
              )}
            >
              {trend.value}
            </span>
          )}
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
            {style.label}
          </span>
        </div>
      </div>

      <p
        className={cn(
          'font-semibold uppercase leading-4 text-balance tracking-[0.28em] text-primary/72',
          isSpotlight ? 'mb-2 text-[10px]' : 'mb-1.5 text-[9px]',
        )}
      >
        {label}
      </p>

      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
        <span
          className={cn(
            'font-headline font-semibold tracking-[-0.06em] text-foreground',
            isSpotlight ? 'text-[2.45rem] leading-none' : 'text-[1.9rem] leading-none',
          )}
        >
          {value}
        </span>
        {subValue && (
          <span className="mb-1 text-xs uppercase tracking-[0.22em] text-muted-foreground/70">
            {subValue}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-[11px] leading-relaxed text-muted-foreground/74">
          {isSpotlight
            ? 'Control signal surfaced in the executive layer.'
            : 'Monitored inside the operating cadence.'}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/35 to-primary/12" />
      </div>
    </div>
  );
}
