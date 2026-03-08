import { DashboardHeader } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { kpiMetadata, type KpiMetadataKey } from '@/app/lib/kpi-metadata';
import { Database, ShieldCheck, Info, AlertTriangle, Target } from 'lucide-react';

const allKpiKeys = Object.keys(kpiMetadata) as KpiMetadataKey[];

export default function MethodologyPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="Data Governance & Methodology" subtitle="Reference" hideFilters />

      <div className="space-y-6">
        <div className="max-w-3xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This Control Tower is a directionally aligned demo of how a telecom
            delivery cockpit can consolidate order, activation, acceptance,
            escalation, and revenue signals into one executive view. Taxonomy is
            grounded in public Salam references; operational metrics remain
            synthetic for demonstration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <Card className="executive-card">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Service Taxonomy</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Data is structured around Salam&apos;s core service families:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>B2B Fiber & Connectivity</li>
                  <li>Managed VPN & SD-WAN</li>
                  <li>Salam Cloud & Data Centers</li>
                  <li>B2C Fiber-to-the-Home (FTTH)</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="executive-card">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold">Data Integrity</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Taxonomy derived from official public Salam records. Operational metrics are synthetic for demonstration.</p>
                <p>Lead times align with industry benchmarks for KSA telecom operations.</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="executive-card max-w-3xl">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Escalation & MTTR Governance</p>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Escalations are classified by severity (Critical, High, Medium) and tracked from
                creation to resolution. Mean Time To Resolution (MTTR) is computed across
                all closed incidents within a rolling 30-day window.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><span className="font-medium text-foreground/80">Critical:</span> SLA breach imminent or service-impacting — target resolution within 4 hours</li>
                <li><span className="font-medium text-foreground/80">High:</span> Revenue or customer-impacting risk — target resolution within 24 hours</li>
                <li><span className="font-medium text-foreground/80">Medium:</span> Operational delay or vendor dependency — target resolution within 72 hours</li>
              </ul>
              <p>
                SLA Breach Risk is flagged when an open escalation exceeds 80% of its severity target
                without an assigned resolution path. Week-over-week trend tracks escalation volume
                to identify systemic issues early.
              </p>
            </div>
          </div>
        </Card>

        {/* ── KPI Dictionary ── */}
        <div className="section-divider">
          <span className="section-label">KPI Dictionary</span>
        </div>

        <p className="max-w-3xl text-sm text-muted-foreground leading-relaxed">
          Every metric in the cockpit is governed with a named source system,
          accountable owner, review forum, and operating threshold. Only metrics
          that pass this standard appear in executive views.
        </p>

        <div className="space-y-3">
          <div className="hidden rounded-lg border border-border/40 bg-background/40 px-4 py-3 lg:grid lg:grid-cols-[1fr_1.2fr_1fr_0.9fr_0.8fr] lg:gap-4">
            {['KPI', 'Source', 'Accountable Owner', 'Review Forum', 'Threshold'].map(
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

          {allKpiKeys.map((key) => {
            const meta = kpiMetadata[key];

            return (
              <div
                key={key}
                className="rounded-lg border border-border/40 bg-background/30 p-4 lg:grid lg:grid-cols-[1fr_1.2fr_1fr_0.9fr_0.8fr] lg:gap-4"
              >
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                    KPI
                  </p>
                  <p className="text-sm font-semibold text-foreground/90">
                    {meta.label}
                  </p>
                </div>
                <div className="mt-3 space-y-1 lg:mt-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                    Source
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {meta.source}
                  </p>
                </div>
                <div className="mt-3 space-y-1 lg:mt-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                    Accountable Owner
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {meta.owner}
                  </p>
                </div>
                <div className="mt-3 space-y-1 lg:mt-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                    Review Forum
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {meta.forum}
                  </p>
                </div>
                <div className="mt-3 space-y-1 lg:mt-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                    Threshold
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {meta.threshold}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/40 px-4 py-2.5 max-w-3xl">
          <Target className="h-3.5 w-3.5 shrink-0 text-primary" />
          <p className="text-[11px] text-muted-foreground">
            {allKpiKeys.length} governed KPIs across delivery, acceptance,
            escalation, booking, and consumer fulfillment domains.
          </p>
        </div>

        <Card className="executive-card border-primary/15 max-w-3xl">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold">Director&apos;s Note</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This Control Tower is designed for high-velocity PMO decisions
              across delivery, acceptance, backlog, escalations, and revenue
              exposure. The AI briefing remains manual by design: leaders
              trigger it when they want narrative synthesis, the experience
              falls back gracefully if AI is unavailable, and recommendations
              stay advisory until a human owner accepts them.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
