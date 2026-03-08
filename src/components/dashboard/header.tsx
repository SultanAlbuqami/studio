import { Calendar as CalendarIcon, Layers, Clock } from 'lucide-react';
import { dataAsOf } from '@/app/lib/dashboard-meta';

interface DashboardHeaderProps {
  /** Page title. Defaults to "Operations Control Tower" */
  title?: string;
  /** Eyebrow label above the title. Defaults to "Director Customer PMO" */
  subtitle?: string;
  /** Hide the filter controls (useful on informational pages) */
  hideFilters?: boolean;
  /** Snapshot freshness label shown on the right */
  timestamp?: string;
}

export function DashboardHeader({
  title = 'Operations Control Tower',
  subtitle = 'Director Customer PMO',
  hideFilters = false,
  timestamp = dataAsOf,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-4 border-b border-border/50 pb-5 lg:flex-row lg:items-end">
      <div className="min-w-0">
        <p className="section-label mb-1">{subtitle}</p>
        <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-balance">
          {title}
        </h1>
      </div>

      {!hideFilters && (
        <div className="flex flex-wrap items-center gap-2 shrink-0 lg:justify-end">
          <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/50 px-3 py-1.5 text-sm">
            <Layers className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground">Portfolio scope: All portfolios</span>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/50 px-3 py-1.5 text-sm">
            <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground">Reporting window: Q1 2026</span>
          </div>

          <div className="flex items-center gap-1.5 px-1 py-1 text-[11px] text-muted-foreground/78">
            <Clock className="w-3 h-3" />
            <span className="tabular-nums">Snapshot: {timestamp}</span>
          </div>
        </div>
      )}
    </header>
  );
}
