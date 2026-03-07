import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Info, ShieldCheck, Database } from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <DashboardHeader />
      
      <div className="max-w-4xl space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Methodology & Data Governance</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            The Salam PMO Control Tower serves as the definitive source of truth for operational delivery and strategic portfolio health. 
            This cockpit synthesizes real-time telemetry from multiple back-office systems into executive-grade insights.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="executive-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Service Taxonomy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Data is structured around Salam's core service families:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>B2B Fiber & Connectivity</li>
                <li>Managed VPN & SD-WAN</li>
                <li>Salam Cloud & Data Centers</li>
                <li>B2C Fiber-to-the-Home (FTTH)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="executive-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Data Integrity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>While taxonomy is derived from official public Salam records, operational metrics (Revenue, SLAs, Account Names) are synthetic for demonstration purposes.</p>
              <p>Lead times align with industry standard benchmarks for KSA telecom operations.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="executive-card bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Director's Note
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm italic text-muted-foreground leading-relaxed">
            "This Control Tower is designed for high-velocity decision making. KPIs are weighted towards financial impact and strategic account stability. Any deviation exceeding 10% in 'On-Time Delivery' triggers an automatic GenAI briefing update for immediate executive review."
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
