import {
  dataConfidenceLedger,
  dataConfidenceSignals,
  dataConfidenceSummary,
} from '@/app/lib/dashboard-data';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Database, ShieldCheck } from 'lucide-react';

export function DataConfidencePanel() {
  return (
    <Card className="executive-card overflow-hidden">
      <div className="border-b border-border/30 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Data Confidence</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/72">
              Trust posture for executive use: freshness, provenance, and
              named governance.
            </p>
          </div>
          <div className="rounded-[1rem] border border-primary/20 bg-primary/10 px-3 py-2 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/72">
              Control score
            </p>
            <p className="mt-1 font-headline text-2xl font-semibold tracking-[-0.05em] text-foreground">
              {dataConfidenceSummary.score}
            </p>
          </div>
        </div>
      </div>

      <CardContent className="space-y-3 p-3">
        <div className="grid gap-2 sm:grid-cols-2">
          {dataConfidenceLedger.map((item) => (
            <div
              key={item.label}
              className="rounded-[1rem] border border-white/10 bg-background/30 p-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/92">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {dataConfidenceSignals.map((signal, index) => {
            const Icon = index === 0 ? ShieldCheck : index === 1 ? Database : CheckCircle2;

            return (
              <div
                key={signal.label}
                className="rounded-[1rem] border border-border/35 bg-background/25 p-3"
              >
                <div className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[12px] font-semibold text-foreground/92">
                        {signal.label}
                      </p>
                      <span className="rounded-full border border-white/10 bg-background/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/78">
                        {signal.value}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                      {signal.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
