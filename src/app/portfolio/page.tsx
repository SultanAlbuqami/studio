import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Globe2,
  Home,
  ShieldCheck,
  TowerControl,
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import {
  getOfficialSourcesForSegment,
  salamOfficialSources,
  salamServiceCoverageSummary,
  salamServiceSegments,
} from '@/app/lib/salam-service-portfolio';

const segmentIconByKey = {
  consumer: Home,
  business: Building2,
  wholesale: Globe2,
} as const;

const operatingLayers = [
  {
    title: 'Acquire and onboard',
    detail:
      'Consumer and SME journeys depend on clean ordering, activation, installation, and digital self-service before service assurance ever begins.',
    routes: ['/booking', '/b2c'],
  },
  {
    title: 'Deliver and accept',
    detail:
      'Business and wholesale services bring structured delivery, field dependencies, cutover windows, and acceptance gates that directly affect revenue timing.',
    routes: ['/delivery', '/strategic'],
  },
  {
    title: 'Protect and recover',
    detail:
      'Managed services, cloud, cybersecurity, and carrier-grade transport require durable escalation ownership, SLA control, and sponsor-ready recovery views.',
    routes: ['/escalations', '/methodology'],
  },
] as const;

export default function ServicePortfolioPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-5 py-6 md:px-8 md:py-8">
      <DashboardHeader
        title="Salam Service Portfolio"
        subtitle="Official service coverage"
        hideFilters
        description="Officially grounded map of Salam&apos;s consumer, business, and wholesale portfolio. This page shows what the control tower is designed to cover, not just how it looks."
        highlights={[
          { label: 'Source base', value: 'Official Salam public references only' },
          { label: 'Coverage', value: 'Consumer, Business, and Wholesale' },
          { label: 'Why it matters', value: 'PMO logic tied to Salam service reality' },
        ]}
        note="Service families and named offers on this page are grounded in Salam&apos;s public consumer, business, wholesale, and product-portfolio materials. Operational KPIs elsewhere in the dashboard remain simulated for demonstration."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="executive-card p-4">
          <p className="section-label">Portfolio segments</p>
          <p className="mt-2 font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {salamServiceCoverageSummary.segments}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Consumer, Business, and Wholesale
          </p>
        </Card>
        <Card className="executive-card p-4">
          <p className="section-label">Service domains</p>
          <p className="mt-2 font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {salamServiceCoverageSummary.categories}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Official categories now reflected in the product story
          </p>
        </Card>
        <Card className="executive-card p-4">
          <p className="section-label">Named offers</p>
          <p className="mt-2 font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {salamServiceCoverageSummary.namedOffers}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Examples pulled from Salam public materials
          </p>
        </Card>
        <Card className="executive-card p-4">
          <p className="section-label">Official references</p>
          <p className="mt-2 font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
            {salamServiceCoverageSummary.officialSources}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Embedded into the service-coverage layer
          </p>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="section-divider">
          <span className="section-label">Portfolio Segments</span>
        </div>

        <div className="grid gap-5">
          {salamServiceSegments.map((segment) => {
            const Icon = segmentIconByKey[segment.key];
            const officialSources = getOfficialSourcesForSegment(segment);

            return (
              <Card
                key={segment.key}
                className="executive-card overflow-hidden border-primary/10"
              >
                <CardContent className="space-y-5 p-5">
                  <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.2rem] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_28px_rgba(73,177,255,0.14)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                            {segment.audience}
                          </p>
                          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                            {segment.title}
                          </h2>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {segment.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-[1.3rem] border border-white/10 bg-background/25 p-4">
                        <p className="text-sm leading-7 text-foreground/90">
                          {segment.overview}
                        </p>
                      </div>

                      <div className="rounded-[1.3rem] border border-primary/15 bg-primary/[0.06] p-4">
                        <div className="flex items-center gap-2">
                          <TowerControl className="h-4 w-4 text-primary" />
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/76">
                            Control-tower implication
                          </p>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-foreground/88">
                          {segment.controlTowerLens}
                        </p>
                      </div>

                      <div className="rounded-[1.3rem] border border-white/10 bg-background/20 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                          Mapped dashboard views
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {segment.mappedRoutes.map((route) => (
                            <Link
                              key={`${segment.key}-${route.url}`}
                              href={route.url}
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-background/45 px-3 py-1.5 text-[11px] font-medium text-foreground/90 transition-colors hover:border-primary/25 hover:text-primary"
                            >
                              {route.title}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        {segment.categories.map((category) => (
                          <div
                            key={`${segment.key}-${category.name}`}
                            className="rounded-[1.2rem] border border-white/10 bg-background/25 p-4"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/72">
                              {category.name}
                            </p>
                            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                              {category.summary}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {category.services.map((service) => (
                                <span
                                  key={service}
                                  className="rounded-full border border-white/10 bg-background/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/86"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/82">
                              {category.operationalLens}
                            </p>
                          </div>
                        ))}
                      </div>

                      <Card className="border border-white/10 bg-background/20">
                        <CardContent className="space-y-3 p-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                              Official sources
                            </p>
                          </div>
                          {officialSources.map((source) => (
                            <a
                              key={source.id}
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                              className="block rounded-[1rem] border border-white/10 bg-background/35 p-3 transition-colors hover:border-primary/25 hover:bg-background/45"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-foreground">
                                    {source.label}
                                  </p>
                                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                                    {source.note}
                                  </p>
                                </div>
                                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              </div>
                            </a>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-divider">
          <span className="section-label">Operating Coverage</span>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {operatingLayers.map((layer) => (
            <Card key={layer.title} className="executive-card">
              <CardContent className="space-y-3 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                  Control layer
                </p>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {layer.title}
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  {layer.detail}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layer.routes.map((route) => (
                    <Link
                      key={`${layer.title}-${route}`}
                      href={route}
                      className="rounded-full border border-white/10 bg-background/35 px-3 py-1.5 text-[11px] font-medium text-foreground/88 transition-colors hover:border-primary/25 hover:text-primary"
                    >
                      {route}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-divider">
          <span className="section-label">Source Library</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {salamOfficialSources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[1.35rem] border border-border/40 bg-card/40 p-4 transition-colors hover:border-primary/25 hover:bg-card/55"
            >
              <p className="text-sm font-semibold text-foreground">
                {source.label}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                {source.note}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                Open official source
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
