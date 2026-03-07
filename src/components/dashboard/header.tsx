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
    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-border/50">
      <div className="min-w-0">
        <p className="section-label mb-1">{subtitle}</p>
        <h1 className="text-2xl font-bold tracking-tight truncate">{title}</h1>
      </div>

      {!hideFilters && (
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/60 bg-card/50 text-sm">
            <Layers className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground">All Portfolios</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/60 bg-card/50 text-sm">
            <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground">Q1 2026</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] text-muted-foreground/60">
            <Clock className="w-3 h-3" />
            <span className="tabular-nums">{timestamp}</span>
          </div>
        </div>
      )}
    </header>
  );
}
