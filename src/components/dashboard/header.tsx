import { Calendar as CalendarIcon, Layers, Clock } from 'lucide-react';
import { dataAsOf } from '@/app/lib/dashboard-meta';

type HeaderHighlight = {
  label: string;
  value: string;
};

type HeaderContext = {
  description: string;
  highlights?: readonly HeaderHighlight[];
  noteLabel?: string;
  note?: string;
};

const headerContextByTitle: Record<string, HeaderContext> = {
  'Operations Control Tower': {
    description:
      'Delivery health, revenue exposure, and intervention priorities across all active customer programs.',
    highlights: [
      { label: 'Focus', value: 'Revenue at risk + milestone drift' },
      { label: 'Cadence', value: 'Daily intervention, weekly PMO review' },
      { label: 'Scope', value: 'All active customer programs' },
    ],
  },
  'Portfolio Explorer': {
    description:
      'Search the live portfolio by project, customer, region, or segment to isolate exposure and coverage gaps.',
    highlights: [
      { label: 'Mode', value: 'Search, filter, open focused brief' },
      { label: 'Focus', value: 'Delayed exposure and coverage gaps' },
      { label: 'Best use', value: 'Pre-review portfolio triage' },
    ],
  },
  'Booking & Fulfillment': {
    description:
      'Order pipeline throughput, fallout rates, and aging to prevent billing delay and avoidable cancellations.',
    highlights: [
      { label: 'Watch', value: '15d+ backlog and fallout pressure' },
      { label: 'Owner', value: 'Order pipeline and fulfillment leads' },
      { label: 'Cadence', value: 'Weekly booking control review' },
    ],
  },
  'Delivery Control Tower': {
    description:
      'Milestone aging, exception recovery, and field-level delivery decisions to stop slippage from reaching acceptance and billing.',
    highlights: [
      { label: 'Watch', value: 'Civil works, installs, overdue stages' },
      { label: 'Focus', value: 'Exceptions needing sponsor action' },
      { label: 'Cadence', value: 'Daily recovery bridge, weekly review' },
    ],
  },
  'Strategic Orders': {
    description:
      'High-value orders whose delivery or acceptance posture is material to revenue timing or customer confidence.',
    highlights: [
      { label: 'Watch', value: 'Quarter-end revenue risk' },
      { label: 'Focus', value: 'Director calls on strategic blockers' },
      { label: 'Cadence', value: 'Revenue protection and account steering' },
    ],
  },
  'B2C Fulfillment': {
    description:
      'Consumer backlog pressure, dispatch ownership, and appointment quality for commercially credible recovery actions.',
    highlights: [
      { label: 'Watch', value: 'Install backlog, dispatch, CSAT' },
      { label: 'Focus', value: 'Recovery crews vs. customer promise' },
      { label: 'Cadence', value: 'Daily dispatch, weekly B2C ops' },
    ],
  },
  'Escalations & Recovery': {
    description:
      'Escalations requiring coordinated ownership before SLA exposure, customer impact, or recovery cost compounds.',
    highlights: [
      { label: 'Watch', value: 'Critical age, MTTR, breach risk' },
      { label: 'Focus', value: 'Recovery ownership and decision windows' },
      { label: 'Cadence', value: 'Daily risk bridge, escalation review' },
    ],
  },
  'From Demo to Live Deployment': {
    description:
      'Transition path from demonstration to governed production: source systems, semantic modeling, ownership, and rollout discipline.',
    highlights: [
      { label: 'Goal', value: 'Trusted KPI model for live leadership use' },
      { label: 'Control', value: 'Source, owner, and forum per KPI' },
      { label: 'Approach', value: 'Phased adoption tied to operating pain' },
    ],
  },
  'Data Governance & Methodology': {
    description:
      'KPI dictionary, escalation logic, and governance rules ensuring every metric reaching the executive view is auditable and decision-ready.',
    highlights: [
      { label: 'Rule', value: 'No KPI without source, owner, threshold' },
      { label: 'Scope', value: 'Delivery, acceptance, backlog, escalation, B2C' },
      { label: 'Purpose', value: 'Decision-ready and auditable views' },
    ],
  },
};

interface DashboardHeaderProps {
  /** Page title. Defaults to "Operations Control Tower" */
  title?: string;
  /** Eyebrow label above the title. Defaults to "Director Customer PMO" */
  subtitle?: string;
  /** Hide the filter controls (useful on informational pages) */
  hideFilters?: boolean;
  /** Snapshot freshness label shown on the right */
  timestamp?: string;
  /** Optional override for the route summary shown below the title */
  description?: string;
  /** Optional override for the quick context cards */
  highlights?: readonly HeaderHighlight[];
  /** Optional override for the right-hand decision note label */
  noteLabel?: string;
  /** Optional override for the right-hand decision note content */
  note?: string;
}

export function DashboardHeader({
  title = 'Operations Control Tower',
  subtitle = 'Director Customer PMO',
  hideFilters = false,
  timestamp = dataAsOf,
  description,
  highlights,
  noteLabel,
  note,
}: DashboardHeaderProps) {
  const fallbackContext = headerContextByTitle[title];
  const resolvedDescription = description ?? fallbackContext?.description;
  const resolvedHighlights = highlights ?? fallbackContext?.highlights ?? [];
  const resolvedNoteLabel = noteLabel ?? fallbackContext?.noteLabel ?? 'Decision Lens';
  const resolvedNote = note ?? fallbackContext?.note;

  return (
    <header className="space-y-4 border-b border-border/50 pb-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
        <div className="min-w-0 space-y-3">
          <p className="section-label">{subtitle}</p>
          <div className="space-y-3">
            <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-balance md:text-[2rem]">
              {title}
            </h1>
            {resolvedDescription && (
              <p className="max-w-4xl text-sm leading-relaxed text-muted-foreground/88 md:text-[15px]">
                {resolvedDescription}
              </p>
            )}
          </div>
        </div>

        {!hideFilters && (
          <div className="grid gap-2 rounded-2xl border border-border/45 bg-card/40 p-3 shadow-[0_18px_45px_rgba(2,6,23,0.18)] xl:min-w-[360px]">
            <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-background/35 px-3 py-2 text-sm">
              <Layers className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Portfolio scope: All portfolios
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-background/35 px-3 py-2 text-sm">
              <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Reporting window: Q1 2026
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-xl border border-border/30 bg-background/20 px-3 py-2 text-[11px] text-muted-foreground/78">
              <Clock className="h-3 w-3" />
              <span className="tabular-nums">Snapshot: {timestamp}</span>
            </div>
          </div>
        )}
      </div>

      {(resolvedHighlights.length > 0 || resolvedNote) && (
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
          {resolvedHighlights.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {resolvedHighlights.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
                  className="rounded-xl border border-border/35 bg-background/25 p-3.5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/72">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground/92">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {resolvedNote && (
            <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/75">
                {resolvedNoteLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/88">
                {resolvedNote}
              </p>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
