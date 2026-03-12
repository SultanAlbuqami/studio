import { useId } from 'react';
import { cn } from '@/lib/utils';

type OrbTone = 'stable' | 'watch' | 'critical' | 'success';
type OrbSize = 'sm' | 'md' | 'lg';

type ControlStatusOrbProps = Readonly<{
  score: number;
  label: string;
  caption: string;
  tone?: OrbTone;
  size?: OrbSize;
  className?: string;
}>;

const toneConfig: Record<
  OrbTone,
  {
    from: string;
    to: string;
    glow: string;
    track: string;
    core: string;
    innerRing: string;
    label: string;
    caption: string;
  }
> = {
  stable: {
    from: '#7fe7ff',
    to: '#5f7bff',
    glow: '#43b9ff',
    track: 'rgba(97, 128, 196, 0.22)',
    core: 'from-slate-500/70 via-slate-700/70 to-[#060b24]',
    innerRing: 'border-sky-300/35',
    label: 'text-sky-100',
    caption: 'text-sky-100/68',
  },
  watch: {
    from: '#ffe68d',
    to: '#ff9f43',
    glow: '#ffb85c',
    track: 'rgba(168, 121, 62, 0.22)',
    core: 'from-amber-500/35 via-slate-700/72 to-[#090d24]',
    innerRing: 'border-amber-300/35',
    label: 'text-amber-50',
    caption: 'text-amber-50/68',
  },
  critical: {
    from: '#ff9ba3',
    to: '#ff5f7b',
    glow: '#ff5f7b',
    track: 'rgba(176, 72, 91, 0.24)',
    core: 'from-rose-500/35 via-slate-700/72 to-[#080c24]',
    innerRing: 'border-rose-300/35',
    label: 'text-rose-50',
    caption: 'text-rose-50/68',
  },
  success: {
    from: '#90ffd4',
    to: '#2dd4bf',
    glow: '#4be2c0',
    track: 'rgba(54, 135, 120, 0.22)',
    core: 'from-emerald-500/30 via-slate-700/72 to-[#090d24]',
    innerRing: 'border-emerald-300/35',
    label: 'text-emerald-50',
    caption: 'text-emerald-50/68',
  },
};

const sizeConfig: Record<
  OrbSize,
  {
    frame: string;
    radius: number;
    stroke: number;
    dashedStroke: number;
    value: string;
    label: string;
    caption: string;
    coreInset: string;
  }
> = {
  sm: {
    frame: 'h-32 w-32',
    radius: 44,
    stroke: 7,
    dashedStroke: 5,
    value: 'text-2xl',
    label: 'text-[10px]',
    caption: 'text-[9px]',
    coreInset: 'inset-[20px]',
  },
  md: {
    frame: 'h-40 w-40',
    radius: 58,
    stroke: 8,
    dashedStroke: 6,
    value: 'text-[2.35rem]',
    label: 'text-xs',
    caption: 'text-[10px]',
    coreInset: 'inset-[24px]',
  },
  lg: {
    frame: 'h-48 w-48',
    radius: 70,
    stroke: 10,
    dashedStroke: 7,
    value: 'text-[2.85rem]',
    label: 'text-sm',
    caption: 'text-[11px]',
    coreInset: 'inset-[28px]',
  },
};

export function ControlStatusOrb({
  score,
  label,
  caption,
  tone = 'stable',
  size = 'md',
  className,
}: ControlStatusOrbProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const gradientId = useId().replace(/:/g, '');
  const glowId = `${gradientId}-glow`;
  const color = toneConfig[tone];
  const dimensions = sizeConfig[size];
  const viewBox = dimensions.radius * 2 + 28;
  const center = viewBox / 2;
  const circumference = 2 * Math.PI * dimensions.radius;
  const progressOffset = circumference - (clampedScore / 100) * circumference;

  return (
    <div
      className={cn(
        'relative shrink-0 rounded-full',
        dimensions.frame,
        className,
      )}
      aria-label={`${clampedScore} ${label}`}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 45px ${color.glow}33`,
        }}
      />

      <svg
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={color.from} />
            <stop offset="100%" stopColor={color.to} />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx={center}
          cy={center}
          r={dimensions.radius + 8}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeDasharray="4 14"
          strokeWidth={dimensions.dashedStroke}
          opacity="0.55"
        />
        <circle
          cx={center}
          cy={center}
          r={dimensions.radius}
          fill="none"
          stroke={color.track}
          strokeWidth={dimensions.stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={dimensions.radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={dimensions.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          filter={`url(#${glowId})`}
        />
      </svg>

      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/6 via-transparent to-transparent" />
      <div
        className={cn(
          'absolute rounded-full border bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(2,6,23,0.42)]',
          dimensions.coreInset,
          color.core,
          color.innerRing,
        )}
      />
      <div
        className={cn(
          'absolute flex flex-col items-center justify-center rounded-full text-center',
          dimensions.coreInset,
        )}
      >
        <span
          className={cn(
            'font-headline font-semibold tracking-[-0.06em] text-white',
            dimensions.value,
          )}
        >
          {clampedScore}
        </span>
        <span
          className={cn(
            'mt-1 font-semibold uppercase tracking-[0.22em]',
            color.label,
            dimensions.label,
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            'mt-1 font-medium tracking-[0.16em]',
            color.caption,
            dimensions.caption,
          )}
        >
          {caption}
        </span>
      </div>
    </div>
  );
}
