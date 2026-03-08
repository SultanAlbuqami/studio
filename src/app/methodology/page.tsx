import { DashboardHeader } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Database, ShieldCheck, Info, AlertTriangle } from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="Data Governance & Methodology" subtitle="Reference" hideFilters />

      <div className="max-w-3xl space-y-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          This Control Tower is a directionally aligned demo of how a telecom
          delivery cockpit can consolidate order, activation, acceptance,
          escalation, and revenue signals into one executive view. Taxonomy is
          grounded in public Salam references; operational metrics remain
          synthetic for demonstration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <Card className="executive-card">
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

        <Card className="executive-card border-primary/15">
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
