'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  kpiMetadata,
  type KpiMetadataKey,
} from '@/app/lib/kpi-metadata';
import { FilterX, Search } from 'lucide-react';

type KpiScope = 'All' | 'Leadership' | 'Delivery' | 'Booking' | 'Escalations' | 'B2C';

const scopeConfig: Record<
  Exclude<KpiScope, 'All'>,
  readonly KpiMetadataKey[]
> = {
  Leadership: [
    'onTimeDelivery',
    'revenueAtRisk',
    'activeOrders',
    'acceptedValueMTD',
    'acceptancePending',
    'pastDueBacklog',
    'orderToActivateCycle',
  ],
  Delivery: ['firstTimeRightDelivery', 'avgDeliveryCycleTime'],
  Booking: [
    'newOrdersMtd',
    'avgBookingToBilling',
    'onTimeFulfillment',
    'orderFallout',
    'cancellations',
  ],
  Escalations: [
    'openEscalations',
    'criticalEscalations',
    'avgMttr',
    'slaBreachRisk',
  ],
  B2C: ['homeFiberSubs', 'pendingInstalls', 'avgInstallTime', 'b2cCsat'],
};

const scopeOrder: readonly KpiScope[] = [
  'All',
  'Leadership',
  'Delivery',
  'Booking',
  'Escalations',
  'B2C',
];

const allKpiKeys = Object.keys(kpiMetadata) as KpiMetadataKey[];

function matchesSearch(key: KpiMetadataKey, query: string) {
  if (!query) return true;

  const meta = kpiMetadata[key];
  const haystack = [
    meta.label,
    meta.source,
    meta.owner,
    meta.forum,
    meta.threshold,
    key,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

export function MethodologyClient() {
  const [scope, setScope] = useState<KpiScope>('All');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredKeys = useMemo(() => {
    const scopedKeys =
      scope === 'All' ? allKpiKeys : [...scopeConfig[scope]];

    return scopedKeys.filter((key) => matchesSearch(key, deferredQuery));
  }, [deferredQuery, scope]);

  const hasActiveFilters = scope !== 'All' || query.trim().length > 0;

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-border/40 bg-card/45 p-4 md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Search and filter the KPI dictionary live
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              This page should help a reviewer verify governance quickly. Search
              by KPI, source, owner, review forum, or threshold, then narrow
              the list by operating domain.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full border border-border/40 bg-background/35 px-3 py-1 text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredKeys.length}</span> of{' '}
              <span className="font-semibold text-foreground">{allKpiKeys.length}</span> KPIs
            </span>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 gap-1.5 px-3 text-sm text-muted-foreground"
                onClick={() => {
                  setScope('All');
                  setQuery('');
                }}
              >
                <FilterX className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search KPI dictionary"
              placeholder="Search KPI, source, owner, forum, or threshold"
              className="h-11 border-border/50 bg-background/60 pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {scopeOrder.map((item) => {
              const count =
                item === 'All' ? allKpiKeys.length : scopeConfig[item].length;
              const active = item === scope;

              return (
                <Button
                  key={item}
                  type="button"
                  variant={active ? 'default' : 'outline'}
                  size="sm"
                  className={`h-9 gap-2 px-3 text-sm ${
                    active
                      ? ''
                      : 'border-border/45 bg-background/35 text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setScope(item)}
                >
                  {item}
                  <span className="rounded-full bg-background/40 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

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
            ),
          )}
        </div>

        {filteredKeys.length === 0 ? (
          <Card className="executive-card border-dashed">
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-foreground">
                No KPI matches this search.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a source system, owner name, forum, or threshold phrase.
              </p>
            </div>
          </Card>
        ) : (
          filteredKeys.map((key) => {
            const meta = kpiMetadata[key];

            return (
              <div
                key={key}
                className="rounded-lg border border-border/40 bg-background/30 p-4 lg:grid lg:grid-cols-[1fr_1.2fr_1fr_0.9fr_0.8fr] lg:gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground/90">
                      {meta.label}
                    </p>
                    <span className="rounded-full border border-border/40 bg-background/35 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/78 lg:hidden">
                      {scope === 'All'
                        ? scopeOrder.find(
                            (item) =>
                              item !== 'All' && scopeConfig[item].includes(key),
                          ) ?? 'Leadership'
                        : scope}
                    </span>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground lg:hidden">
                    KPI
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
          })
        )}
      </div>
    </section>
  );
}
