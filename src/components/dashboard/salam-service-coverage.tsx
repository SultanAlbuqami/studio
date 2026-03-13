import Link from 'next/link';
import { ArrowRight, Building2, Globe2, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  salamServiceCoverageSummary,
  salamServiceSegments,
} from '@/app/lib/salam-service-portfolio';

const segmentIconByKey = {
  consumer: Home,
  business: Building2,
  wholesale: Globe2,
} as const;

type SalamServiceCoverageProps = Readonly<{
  compact?: boolean;
}>;

export function SalamServiceCoverage({
  compact = false,
}: SalamServiceCoverageProps) {
  if (compact) {
    return (
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="executive-card border-primary/12 overflow-hidden">
          <CardContent className="space-y-4 p-5">
            <div>
              <p className="section-label">Official Salam Coverage</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Portfolio fit without leaving the home view
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The dashboard now maps to Salam&apos;s public Consumer,
                Business, and Wholesale portfolio so leadership can see the
                service scope immediately.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.1rem] border border-white/8 bg-background/22 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/72">
                  Segments
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                  {salamServiceCoverageSummary.segments}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-white/8 bg-background/22 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/72">
                  Service domains
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                  {salamServiceCoverageSummary.categories}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-white/8 bg-background/22 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/72">
                  Named offers
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                  {salamServiceCoverageSummary.namedOffers}
                </p>
              </div>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Open the full Salam service portfolio map
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-3 md:grid-cols-3">
          {salamServiceSegments.map((segment) => {
            const Icon = segmentIconByKey[segment.key];

            return (
              <Card key={segment.key} className="executive-card overflow-hidden">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-primary/16 bg-primary/8 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {segment.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                        {segment.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-[12px] leading-relaxed text-foreground/84">
                    {segment.categories
                      .slice(0, 2)
                      .map((category) => category.name)
                      .join(' · ')}
                  </p>

                  <p className="text-[11px] leading-relaxed text-muted-foreground/78">
                    {segment.mappedRoutes[0]?.reason}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="executive-card border-primary/15 overflow-hidden">
        <CardContent className="space-y-4 p-5">
          <div>
            <p className="section-label">Official Salam Coverage</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              Consumer, Business, and Wholesale in one operating model
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The dashboard is now anchored to Salam&apos;s public service
              portfolio so the control tower explains what Salam sells, not
              only how a PMO might operate in the abstract.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/10 bg-background/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Portfolio segments
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                {salamServiceCoverageSummary.segments}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Consumer, Business, and Wholesale
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-background/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Service domains
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                {salamServiceCoverageSummary.categories}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Official categories mapped into the control-tower scope
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-background/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Named offers
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                {salamServiceCoverageSummary.namedOffers}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Reference offers from Salam&apos;s public materials
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-background/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                Source base
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                {salamServiceCoverageSummary.officialSources}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Official Salam public references embedded into the product story
              </p>
            </div>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Open full service portfolio map
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {salamServiceSegments.map((segment) => {
          const Icon = segmentIconByKey[segment.key];

          return (
            <Card key={segment.key} className="executive-card overflow-hidden">
              <CardContent className="space-y-4 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {segment.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                      {segment.subtitle}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1rem] border border-white/10 bg-background/25 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/72">
                    Control-tower lens
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-foreground/88">
                    {segment.controlTowerLens}
                  </p>
                </div>

                <div className="space-y-2">
                  {segment.categories.slice(0, 3).map((category) => (
                    <div
                      key={category.name}
                      className="rounded-[1rem] border border-white/10 bg-background/20 p-3"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/74">
                        {category.name}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-foreground/86">
                        {category.services.slice(0, 3).join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
