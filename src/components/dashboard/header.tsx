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
      'Director-level view of delivery health, revenue exposure, and interventions that can change this week’s operating outcome.',
    highlights: [
      { label: 'Leadership lens', value: 'Revenue at risk + milestone drift' },
      { label: 'Primary rhythm', value: 'Daily intervention and weekly PMO review' },
      { label: 'Portfolio scope', value: 'All active customer programs' },
    ],
    noteLabel: 'How To Use This View',
    note:
      'Start with the spotlight KPIs, then move to the right-rail intervention queue to identify the few actions that need sponsor attention now.',
  },
  'Portfolio Explorer': {
    description:
      'Search the live portfolio by project, customer, region, or segment and reframe the filtered view as a leadership conversation, not just a table.',
    highlights: [
      { label: 'Working mode', value: 'Search, filter, then open a focused brief' },
      { label: 'Decision lens', value: 'Delayed exposure and coverage gaps' },
      { label: 'Best use', value: 'Portfolio triage before leadership reviews' },
    ],
    noteLabel: 'Product Intent',
    note:
      'The explorer is the fastest route from a broad operating question to one accountable project or account conversation.',
  },
  'Booking & Fulfillment': {
    description:
      'Order-pipeline control view for throughput, fallout, and aging so the PMO can intervene before billing delay or avoidable cancellations compound.',
    highlights: [
      { label: 'Primary watch', value: '15d+ backlog and fallout pressure' },
      { label: 'Operating owner', value: 'Order pipeline and fulfillment leads' },
      { label: 'Review rhythm', value: 'Weekly booking control review' },
    ],
  },
  'Delivery Control Tower': {
    description:
      'Field-operations cockpit for milestone aging, exception recovery, and delivery decisions that can stop slippage from cascading into acceptance and billing.',
    highlights: [
      { label: 'Primary watch', value: 'Civil works, installs, and overdue stages' },
      { label: 'Decision lens', value: 'Which exceptions need sponsor action now' },
      { label: 'Review rhythm', value: 'Daily recovery bridge and weekly delivery review' },
    ],
    noteLabel: 'Decision Standard',
    note:
      'Each queue item should lead to one accountable owner, one decision window, and one expected impact before it reaches the leadership forum.',
  },
  'Strategic Orders': {
    description:
      'High-value account view for orders whose delivery or acceptance posture is material enough to affect revenue timing or customer confidence.',
    highlights: [
      { label: 'Primary watch', value: 'Quarter-end revenue and customer confidence' },
      { label: 'Decision lens', value: 'Director calls on strategic blockers' },
      { label: 'Review rhythm', value: 'Revenue protection and account steering' },
    ],
    noteLabel: 'What Good Looks Like',
    note:
      'The queue should tell leadership exactly which high-value account needs a call, why it matters now, and what outcome that call should unlock.',
  },
  'B2C Fulfillment': {
    description:
      'Consumer-operations view for backlog pressure, dispatch ownership, and appointment quality so recovery actions stay commercially credible.',
    highlights: [
      { label: 'Primary watch', value: 'Install backlog, dispatch pressure, CSAT' },
      { label: 'Decision lens', value: 'Recovery crews versus customer promise risk' },
      { label: 'Review rhythm', value: 'Daily dispatch review and weekly B2C ops' },
    ],
  },
  'Escalations & Recovery': {
    description:
      'Service and delivery risk queue for escalations that need coordinated ownership before SLA exposure, customer noise, or recovery cost rises further.',
    highlights: [
      { label: 'Primary watch', value: 'Critical age, MTTR, and breach risk' },
      { label: 'Decision lens', value: 'Recovery ownership and decision windows' },
      { label: 'Review rhythm', value: 'Daily risk bridge and escalation review' },
    ],
    noteLabel: 'Recovery Standard',
    note:
      'A credible recovery item names the owner, the required decision, and the commercial or service impact of moving too slowly.',
  },
  'From Demo to Live Deployment': {
    description:
      'Transition plan from interview demo to governed production control tower, covering source systems, semantic modeling, ownership, and rollout discipline.',
    highlights: [
      { label: 'Operating goal', value: 'Trusted KPI model for live leadership use' },
      { label: 'Critical control', value: 'Source, owner, and review forum per KPI' },
      { label: 'Rollout posture', value: 'Phased adoption tied to real operating pain' },
    ],
  },
  'Data Governance & Methodology': {
    description:
      'Reference layer for the demo’s taxonomy, KPI dictionary, escalation logic, and governance rules before any metric reaches the executive cockpit.',
    highlights: [
      { label: 'Governance rule', value: 'No KPI without source, owner, and threshold' },
      { label: 'Scope', value: 'Delivery, acceptance, backlog, escalation, B2C' },
      { label: 'Purpose', value: 'Keep executive views decision-ready and auditable' },
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
