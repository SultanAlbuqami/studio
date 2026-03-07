'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import {
  deploymentKpiAlignmentKeys,
  kpiMetadata,
} from '@/app/lib/kpi-metadata';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  Layers,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

const executiveOutcomes = [
  {
    icon: Target,
    label: 'Core KPI Discipline',
    value: 'Source -> owner -> forum',
    detail:
      'Only metrics with a system of record, accountable owner, and review cadence earn a place in the live cockpit.',
  },
  {
    icon: Users,
    label: 'Operating Ownership',
    value: 'Business + data accountability',
    detail:
      'PMO, service delivery, billing, ITSM, and NOC each own refresh quality and action follow-through in production.',
  },
  {
    icon: Clock,
    label: 'Decision Cadence',
    value: 'Daily to monthly rhythm',
    detail:
      'The same governed model supports morning intervention calls, weekly delivery reviews, and monthly leadership packs.',
  },
  {
    icon: Sparkles,
    label: 'AI Guardrails',
    value: 'Manual, bounded, review-first',
    detail:
      'Executive briefing stays user-triggered, grounded in approved metrics, and safe when the provider or key is unavailable.',
  },
] as const;

const directorQuestions = [
  'Which delivery or acceptance commitments are most likely to miss this month and threaten revenue recognition?',
  'Where do PMO, provisioning, service operations, or field teams need executive escalation this week?',
  'Which KPI shift is material enough to change the customer or portfolio conversation at leadership level?',
] as const;

const directorCadence = [
  {
    cadence: 'Daily',
    title: 'Intervention Huddle',
    detail:
      'Resolve overdue backlog, acceptance blockers, field constraints, and high-priority fallout before customer impact compounds.',
  },
  {
    cadence: 'Weekly',
    title: 'PMO Control Review',
    detail:
      'Review OTD, revenue exposure, strategic accounts, and required cross-functional escalations with delivery and sales interfaces.',
  },
  {
    cadence: 'Monthly',
    title: 'Leadership Pack',
    detail:
      'Surface structural bottlenecks, trend shifts, and policy or capacity asks that require director or VP-level intervention.',
  },
] as const;

const aiGuardrails = [
  'Manual only. The brief is generated when a leader requests it; there is no automatic run on page load or schedule.',
  'Source-bounded. AI receives a curated KPI snapshot and approved context, not unrestricted raw enterprise data.',
  'Human-reviewed. Recommendations stay advisory until the PMO or operations owner accepts and assigns them.',
  'Graceful fallback. If OpenAI is unavailable or the key is missing, the dashboard keeps serving a static executive brief.',
  'Governed vocabulary. Recovery wording, escalation framing, and account-risk narrative are centralized in the shared decision dataset before they reach the AI layer.',
] as const;

const blocks = [
  {
    step: '01',
    icon: Database,
    title: 'Data Sources',
    subtitle: 'Operational Backbone',
    badge: '9 source domains',
    decision:
      'Which operational systems must be integrated first so PMO leadership can stop reconciling delivery, acceptance, and billing manually?',
    goLive:
      'Start with OMS, CRM, milestone tracking, and acceptance. Add billing, ITSM, and NOC as the control tower expands into revenue and service risk decisions.',
    intro:
      'The live platform should land on the same systems already used to run orders, service activation, acceptance, escalation, and revenue handover. The objective is one reconciled delivery position, not another reporting layer.',
    items: [
      {
        label: 'Order Management System',
        detail:
          'Order lifecycle, milestone status, target dates, and completion timestamps used for delivery and cycle-time KPIs.',
      },
      {
        label: 'CRM / Account Platform',
        detail:
          'Customer hierarchy, contract context, strategic-account tagging, and relationship history for account-level decision making.',
      },
      {
        label: 'Provisioning & Activation',
        detail:
          'Activation readiness, provisioning fallout, and handoff timing between service delivery and technical teams.',
      },
      {
        label: 'Project & Milestone Tracking',
        detail:
          'Stage-level aging, dependency management, and resource assignments across delivery programs and major orders.',
      },
      {
        label: 'Acceptance Register',
        detail:
          'Customer sign-off position, overdue acceptance items, and blocked revenue recognition cases by account.',
      },
      {
        label: 'ITSM & Escalation Platform',
        detail:
          'Incident severity, escalation age, recovery ownership, and SLA clock exposure tied back to delivery commitments.',
      },
      {
        label: 'NOC / Service Operations',
        detail:
          'Service-impacting incidents, outage notices, and operational risk signals that can trigger executive intervention.',
      },
      {
        label: 'Billing & Revenue Systems',
        detail:
          'Billing milestones, revenue recognition triggers, and realized vs exposed value linked to acceptance and completion.',
      },
      {
        label: 'SLA Repository',
        detail:
          'Contractual commitments, response and restore targets, breach rules, and service-level exceptions by customer.',
      },
    ],
  },
  {
    step: '02',
    icon: Layers,
    title: 'Power BI / Semantic Layer',
    subtitle: 'Governed Reporting Architecture',
    badge: '1 governed model',
    decision:
      'How do we keep every executive page aligned to one KPI definition instead of letting each report create its own logic?',
    goLive:
      'Use one semantic model as the business-logic layer, mix scheduled refresh with near-real-time feeds, and secure the view by role from day one.',
    intro:
      'Power BI only earns its place here if it behaves as a controlled semantic layer. Raw source data stays separated from curated metrics, and every executive view reads from the same definitions.',
    items: [
      {
        label: 'Central Semantic Model',
        detail:
          'A single certified model holds KPI logic for OTD, backlog, acceptance, SLA risk, and revenue exposure.',
      },
      {
        label: 'Composite Data Strategy',
        detail:
          'Batch-heavy sources use Import refresh while incidents, escalations, and freshness-sensitive feeds use DirectQuery or hybrid patterns.',
      },
      {
        label: 'Enterprise Gateway',
        detail:
          'Secure connectivity bridges on-prem or private-network systems into the reporting service without bypassing corporate controls.',
      },
      {
        label: 'Row-Level Security',
        detail:
          'Executives, regional leads, and portfolio managers consume scope-appropriate views from the same certified model.',
      },
      {
        label: 'Refresh & Freshness SLA',
        detail:
          'Every source has a declared refresh cadence and freshness expectation so leadership knows whether a number is daily, intra-day, or near real time.',
      },
      {
        label: 'Certified Reports & Packs',
        detail:
          'Interactive dashboards, paginated review packs, and exported leadership decks all read from the same semantic layer.',
      },
      {
        label: 'Promotion Path',
        detail:
          'Development, test, and production workspaces keep KPI changes controlled before they land in executive forums.',
      },
    ],
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Governance & Ownership',
    subtitle: 'Operating Discipline',
    badge: 'Named owner per domain',
    decision:
      'Who owns metric quality, threshold changes, and action follow-through once the control tower is visible to leadership?',
    goLive:
      'Every KPI needs a business owner, a data owner, and a review forum before it is used in a director or VP discussion.',
    intro:
      'Without explicit ownership, executive dashboards become argument rather than action. Governance here is about decision rights, controlled change, and a reliable operating rhythm.',
    items: [
      {
        label: 'KPI Dictionary',
        detail:
          'Document definitions, formulas, thresholds, and escalation rules so delivery, operations, finance, and sales read the same number the same way.',
      },
      {
        label: 'Business Owners',
        detail:
          'A named PMO or operations leader owns the meaning of each KPI and the action expected when thresholds are breached.',
      },
      {
        label: 'Data Domain Owners',
        detail:
          'One accountable owner per source system is responsible for schema changes, refresh reliability, and data-quality remediation.',
      },
      {
        label: 'Access Governance',
        detail:
          'Role-based access, periodic reviews, and audit trails protect sensitive customer, financial, and operational views.',
      },
      {
        label: 'Data Quality Controls',
        detail:
          'Completeness, timeliness, reconciliation, and anomaly checks should run automatically before executive metrics are published.',
      },
      {
        label: 'Threshold & Exception Rules',
        detail:
          'OTD drift, overdue acceptance, SLA risk, and revenue exposure thresholds need predefined trigger points and escalation paths.',
      },
      {
        label: 'Change Control',
        detail:
          'KPI additions or logic changes move through a governed approval path to prevent silent metric drift in leadership reporting.',
      },
      {
        label: 'Review Cadence',
        detail:
          'Daily intervention, weekly PMO review, and monthly leadership pack each consume a defined output from this same model.',
      },
    ],
  },
  {
    step: '04',
    icon: Route,
    title: 'Phased Rollout',
    subtitle: 'Staged Path to Production',
    badge: '4 production phases',
    decision:
      'What is the safest sequence to move from interview demo to trusted operating platform without overloading the organization on day one?',
    goLive:
      'Begin with the weekly PMO review, then add operational depth, governance hardening, and finally AI-assisted summarization once data discipline is stable.',
    intro:
      'The rollout should be tied to operating pain, not feature count. Each phase should remove a manual dependency and make one leadership forum more reliable than it is today.',
    items: [
      {
        label: 'Phase 1 - PMO Pilot',
        detail:
          'Land OMS, CRM, milestone, and acceptance data. Stand up the director weekly review with 2-3 portfolio managers and validate every KPI against manual packs.',
      },
      {
        label: 'Phase 2 - Operational Depth',
        detail:
          'Add provisioning, ITSM, NOC, and billing feeds. Expand visibility to operations leads and expose drill-downs by account, region, and service family.',
      },
      {
        label: 'Phase 3 - Governance Hardening',
        detail:
          'Formalize the KPI dictionary, access model, data-quality checks, and paginated executive packs so the cockpit is audit-ready and repeatable.',
      },
      {
        label: 'Phase 4 - AI-Assisted Layer',
        detail:
          'Introduce manual executive brief generation and recommended-action drafting only after trusted KPIs and ownership discipline are established.',
      },
    ],
  },
] as const;

export default function DeploymentRoadmapPage() {
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>({
    '01': true,
    '02': false,
    '03': false,
    '04': false,
  });

  const toggle = (step: string) =>
    setOpenBlocks((prev) => ({ ...prev, [step]: !prev[step] }));

  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-8">
      <DashboardHeader
        title="From Demo to Live Deployment"
        subtitle="Operationalization Roadmap"
        hideFilters
      />

      <section className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <Card className="executive-card">
          <div className="p-5 md:p-6 space-y-4">
            <p className="section-label">Operating Model Transition</p>
            <p className="max-w-4xl text-sm leading-relaxed text-muted-foreground">
              This page translates the demo into a live operating
              model for a telecom and business-services PMO. The production
              version is not just a prettier dashboard. It is a governed control
              tower with trusted KPI definitions, named owners, review cadence,
              centralized recovery and escalation vocabulary, and a safe path to
              manual AI-assisted executive summarization.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                'A smaller KPI set tied directly to delivery, acceptance, SLA risk, and revenue realization.',
                'One semantic layer feeding daily interventions, weekly PMO reviews, and monthly leadership packs.',
                'AI used as an executive aid only after the underlying numbers are owned, reconciled, and reviewable.',
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-lg border border-border/40 bg-background/40 p-3"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <p className="text-[13px] leading-relaxed text-foreground/90">
                      {point}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="executive-card border-primary/15">
          <div className="p-5 md:p-6 space-y-4">
            <p className="section-label">Director Lens</p>
            <h2 className="text-lg font-semibold tracking-tight">
              What a Director Customer PMO must see immediately
            </h2>
            <div className="space-y-3">
              {directorQuestions.map((question) => (
                <div
                  key={question}
                  className="flex items-start gap-2 rounded-lg border border-border/40 bg-background/40 p-3"
                >
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {question}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground/70">
              If the live platform cannot answer these without spreadsheet
              reconciliation or side conversations, it is not ready for
              leadership use.
            </p>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {executiveOutcomes.map((outcome) => (
          <Card key={outcome.label} className="executive-card">
            <div className="p-4 md:p-5 space-y-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <outcome.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {outcome.label}
                </p>
                <p className="mt-1 text-base font-semibold tracking-tight">
                  {outcome.value}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {outcome.detail}
              </p>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="executive-card">
          <div className="p-5 md:p-6 space-y-5">
            <div className="space-y-2">
              <p className="section-label">KPI Alignment</p>
              <h2 className="text-lg font-semibold tracking-tight">
                Source, owner, and review forum for the live cockpit
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If a KPI cannot be sourced, owned, and reviewed, it stays out of
                the executive layer. This is the control point that keeps the
                dashboard decision-oriented instead of decorative.
              </p>
            </div>

            <div className="space-y-3">
              <div className="hidden rounded-lg border border-border/40 bg-background/40 px-4 py-3 lg:grid lg:grid-cols-[1.1fr_1.2fr_1fr_0.9fr] lg:gap-4">
                {['KPI', 'Primary Source', 'Accountable Owner', 'Review Forum'].map(
                  (label) => (
                    <p
                      key={label}
                      className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
                    >
                      {label}
                    </p>
                  )
                )}
              </div>

              {deploymentKpiAlignmentKeys.map((key) => {
                const row = kpiMetadata[key];

                return (
                <div
                  key={row.label}
                  className="rounded-lg border border-border/40 bg-background/30 p-4 lg:grid lg:grid-cols-[1.1fr_1.2fr_1fr_0.9fr] lg:gap-4"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                      KPI
                    </p>
                    <p className="text-sm font-semibold text-foreground/90">
                      {row.label}
                    </p>
                  </div>
                  <div className="mt-3 space-y-1 lg:mt-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                      Primary Source
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {row.source}
                    </p>
                  </div>
                  <div className="mt-3 space-y-1 lg:mt-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                      Accountable Owner
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {row.owner}
                    </p>
                  </div>
                  <div className="mt-3 space-y-1 lg:mt-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                      Review Forum
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {row.forum}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="executive-card">
            <div className="p-5 md:p-6 space-y-4">
              <div className="space-y-2">
                <p className="section-label">Role Alignment</p>
                <h2 className="text-lg font-semibold tracking-tight">
                  PMO operating cadence
                </h2>
              </div>

              <div className="space-y-3">
                {directorCadence.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border/40 bg-background/30 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                        {item.cadence}
                      </span>
                      <p className="text-sm font-semibold text-foreground/90">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="executive-card border-primary/15">
            <div className="p-5 md:p-6 space-y-4">
              <div className="space-y-2">
                <p className="section-label">AI Brief + Recommended Actions</p>
                <h2 className="text-lg font-semibold tracking-tight">
                  Guardrails before AI is scaled
                </h2>
              </div>

              <div className="space-y-3">
                {aiGuardrails.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-border/40 bg-background/30 p-3"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-divider">
          <span className="section-label">Deployment Blocks</span>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {blocks.map((block) => (
            <Collapsible
              key={block.step}
              open={openBlocks[block.step]}
              onOpenChange={() => toggle(block.step)}
            >
              <Card className="executive-card overflow-hidden">
                <CollapsibleTrigger className="w-full rounded-lg p-5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <block.icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 tabular-nums">
                          Step {block.step}
                        </span>
                        <span className="rounded-full border border-border/50 bg-background/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                          {block.badge}
                        </span>
                      </div>
                      <h2 className="text-base font-semibold tracking-tight leading-snug">
                        {block.title}
                      </h2>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                        {block.subtitle}
                      </p>
                    </div>

                    <ChevronDown
                      className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform duration-200 ${
                        openBlocks[block.step] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="space-y-4 px-5 pb-5 md:px-6 md:pb-6">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg border border-border/40 bg-background/30 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Executive Decision Supported
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                          {block.decision}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border/40 bg-background/30 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Go-Live Standard
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                          {block.goLive}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {block.intro}
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      {block.items.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-lg border border-border/35 bg-background/20 p-3"
                        >
                          <p className="text-sm font-semibold text-foreground/90">
                            {item.label}
                          </p>
                          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </section>

      <div className="max-w-4xl pt-1 space-y-6">
        <p className="text-[11px] leading-relaxed text-muted-foreground/55">
          This roadmap is directionally aligned with enterprise telecom delivery
          operating models. Source systems, KPI names, Power BI architecture,
          and AI controls are illustrative target-state patterns, not a claim
          about any specific internal Salam implementation.
        </p>

        <div className="rounded-lg border border-border/30 bg-card/30 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-2">
            About this dashboard
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground/70">
            Concept, information design, KPI architecture, dashboard UX, and full implementation by <span className="text-foreground/80 font-medium">Sultan Albuqami</span>. This executive dashboard demo was conceived, designed, and implemented to demonstrate leadership-level thinking in customer delivery governance, KPI architecture, and executive decision support.
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/45">
            Prepared as an executive interview demonstration using illustrative operating data, representative labels, and simulated delivery scenarios.
          </p>
        </div>
      </div>
    </div>
  );
}
