"use client";

import { startTransition, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent } from '@/components/ui/card';
import { explorerData, projectFocusDetails, accountRiskProfiles } from '@/app/lib/dashboard-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Briefcase,
  FilterX,
  CheckCircle2,
  DollarSign,
  FolderKanban,
  Search,
  ShieldAlert,
  User,
} from 'lucide-react';
import { FocusDetailSheet } from '@/components/dashboard/focus-detail-sheet';

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-400',
  Delayed: 'bg-destructive/10 text-destructive',
  Completed: 'bg-primary/10 text-primary',
};

function parseValue(v: string): number {
  return Number.parseFloat(v.replaceAll(/[^0-9.]/g, '')) || 0;
}

function getStatusPriority(status: string) {
  if (status === 'Delayed') return 0;
  if (status === 'Active') return 1;
  return 2;
}

const statusCounts = {
  total: explorerData.length,
  active: explorerData.filter((p) => p.status === 'Active').length,
  delayed: explorerData.filter((p) => p.status === 'Delayed').length,
  completed: explorerData.filter((p) => p.status === 'Completed').length,
};

const valueSummary = (() => {
  let delivered = 0;
  let atRisk = 0;
  let active = 0;
  for (const p of explorerData) {
    const v = parseValue(p.value);
    if (p.status === 'Completed') delivered += v;
    else if (p.status === 'Delayed') atRisk += v;
    else active += v;
  }
  return { delivered, atRisk, active, total: delivered + atRisk + active };
})();

type ExplorerClientProps = Readonly<{
  initialFocusId: string;
  initialQuery: string;
}>;

export function ExplorerClient({
  initialFocusId,
  initialQuery,
}: ExplorerClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [lastCommittedQuery, setLastCommittedQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();
  const deferredQuery = useDeferredValue(query);
  const focusedDetail = projectFocusDetails[initialFocusId] ?? null;
  const matchedRiskProfile = accountRiskProfiles.find(
    (profile) => profile.focusId === initialFocusId,
  );
  const clearFocusHref =
    initialQuery && initialQuery !== initialFocusId
      ? `/explorer?query=${encodeURIComponent(initialQuery)}`
      : '/explorer';

  useEffect(() => {
    setQuery(initialQuery);
    setLastCommittedQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const nextQuery = deferredQuery.trim();
    const committedQuery = lastCommittedQuery.trim();

    if (nextQuery === committedQuery) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextQuery) {
        params.set('query', nextQuery);
      } else {
        params.delete('query');
      }

      const href = params.toString() ? `/explorer?${params.toString()}` : '/explorer';

      startTransition(() => {
        router.replace(href, { scroll: false });
      });
      setLastCommittedQuery(nextQuery);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [deferredQuery, lastCommittedQuery, router, searchParams]);

  const filtered = useMemo(() => {
    if (!query.trim()) return explorerData;
    const q = query.toLowerCase();
    return explorerData.filter(
      (item) =>
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.segment.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredValue = filtered.reduce(
    (sum, item) => sum + parseValue(item.value),
    0,
  );
  const delayedProjects = filtered.filter((item) => item.status === 'Delayed');
  const delayedValue = delayedProjects.reduce(
    (sum, item) => sum + parseValue(item.value),
    0,
  );
  const regionCoverage = new Set(filtered.map((item) => item.region)).size;
  const segmentCoverage = new Set(filtered.map((item) => item.segment)).size;
  const topPriorityProjects = [...filtered].sort((left, right) => {
    const leftPriority = getStatusPriority(left.status);
    const rightPriority = getStatusPriority(right.status);

    if (leftPriority !== rightPriority) {
      return leftPriority - rightPriority;
    }

    return parseValue(right.value) - parseValue(left.value);
  }).slice(0, 3);
  const leadingProject = topPriorityProjects[0] ?? null;
  const delayedProjectsLabel = delayedProjects.length === 1 ? 'project is' : 'projects are';
  const directorReading = delayedProjects.length > 0
    ? `${delayedProjects.length} delayed ${delayedProjectsLabel} carrying ${delayedValue.toFixed(1)}M SAR of exposed value in the current view. The highest-value item to review next is ${leadingProject?.name ?? 'the leading delayed project'}.`
    : 'No delayed projects are present in the current view. The immediate focus is keeping active value moving while protecting closeout quality on the largest live programs.';

  const focusProject = (projectId: string) => {
    const params = new URLSearchParams();

    params.set('focus', projectId);
    if (query.trim()) {
      params.set('query', query.trim());
    }

    router.push(`/explorer?${params.toString()}`);
  };

  const handleProjectKeyDown = (
    event: React.KeyboardEvent<HTMLTableRowElement>,
    projectId: string,
  ) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    focusProject(projectId);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 md:px-8 md:py-8 space-y-6">
      <DashboardHeader title="Portfolio Explorer" subtitle="Search & Analysis" />

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="executive-card p-4">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-muted/50 mb-3">
            <FolderKanban className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            Total Projects
          </p>
          <p className="text-xl font-bold">{statusCounts.total}</p>
        </div>
        <div className="executive-card p-4">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-emerald-500/10 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            Active
          </p>
          <p className="text-xl font-bold text-emerald-400">{statusCounts.active}</p>
        </div>
        <div className="executive-card p-4">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-destructive/10 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            Delayed
          </p>
          <p className="text-xl font-bold text-destructive">{statusCounts.delayed}</p>
        </div>
        <div className="executive-card p-4">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-primary/10 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            Completed
          </p>
          <p className="text-xl font-bold text-primary">{statusCounts.completed}</p>
        </div>
      </section>

      {/* ── Portfolio Value Summary ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="executive-card p-4">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-muted/50 mb-3">
            <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            Total Portfolio
          </p>
          <p className="text-xl font-bold">{valueSummary.total.toFixed(1)}M</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">SAR</p>
        </div>
        <div className="executive-card p-4">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-emerald-500/10 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            Active Value
          </p>
          <p className="text-xl font-bold text-emerald-400">{valueSummary.active.toFixed(1)}M</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">SAR</p>
        </div>
        <div className="executive-card p-4">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-destructive/10 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            At-Risk Value
          </p>
          <p className="text-xl font-bold text-destructive">{valueSummary.atRisk.toFixed(1)}M</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">SAR</p>
        </div>
        <div className="executive-card p-4">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-primary/10 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
            Delivered Value
          </p>
          <p className="text-xl font-bold text-primary">{valueSummary.delivered.toFixed(1)}M</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">SAR</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Project ID, Customer, or Region…"
            aria-label="Search portfolio projects"
            type="search"
            className="pl-10 h-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 px-2 text-xs text-muted-foreground tabular-nums">
          <span>
            {filtered.length} of {explorerData.length} projects
          </span>
          {initialFocusId && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
              Focused project: {initialFocusId}
            </span>
          )}
          {(query.trim() || initialFocusId) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2 text-xs text-muted-foreground"
              onClick={() => router.push('/explorer')}
            >
              <FilterX className="h-3.5 w-3.5" />
              Clear view
            </Button>
          )}
        </div>
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="executive-card">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">Portfolio Posture in Current View</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Decision framing for the filtered portfolio, not just a project list.
            </p>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                <p className="section-label">Value in View</p>
                <p className="mt-2 text-2xl font-bold tabular-nums">{filteredValue.toFixed(1)}M</p>
                <p className="mt-1 text-xs text-muted-foreground">SAR across the filtered portfolio.</p>
              </div>
              <div className="rounded-md border border-rose-500/20 bg-rose-500/5 p-3">
                <p className="section-label">Delayed Exposure</p>
                <p className="mt-2 text-2xl font-bold tabular-nums text-rose-400">{delayedValue.toFixed(1)}M</p>
                <p className="mt-1 text-xs text-muted-foreground">SAR currently sitting in delayed projects.</p>
              </div>
              <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                <p className="section-label">Region Coverage</p>
                <p className="mt-2 text-2xl font-bold tabular-nums">{regionCoverage}</p>
                <p className="mt-1 text-xs text-muted-foreground">Regions represented in this working set.</p>
              </div>
              <div className="rounded-md border border-border/30 bg-muted/10 p-3">
                <p className="section-label">Segment Mix</p>
                <p className="mt-2 text-2xl font-bold tabular-nums">{segmentCoverage}</p>
                <p className="mt-1 text-xs text-muted-foreground">Customer segments currently in view.</p>
              </div>
            </div>

            <div className="rounded-md border border-border/30 bg-background/30 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Director Reading
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {directorReading}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="executive-card">
          <div className="px-5 pt-5 pb-3">
            <p className="text-sm font-semibold">Priority Review Queue</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fast access to the projects most likely to change the leadership conversation.
            </p>
          </div>
          <CardContent className="px-5 pb-5 pt-0 space-y-3">
            {topPriorityProjects.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => focusProject(item.id)}
                className="w-full rounded-md border border-border/30 bg-muted/10 p-3 text-left transition-colors hover:bg-muted/15"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                        P{index + 1}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">{item.id}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground/92">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.region} · {item.segment}
                    </p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${statusStyles[item.status] ?? ''}`}>
                    {item.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/30 pt-3 text-[11px] text-muted-foreground/78">
                  <span>Value: {item.value} SAR</span>
                  <span className="inline-flex items-center gap-1 text-primary">
                    Open detail
                    <Search className="h-3 w-3" />
                  </span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* ── Account Risk Profile (shared with home + AI) ── */}
      {matchedRiskProfile && (
        <Card className="executive-card border-rose-500/20 overflow-hidden">
          <CardContent className="px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {matchedRiskProfile.accountName}
                  </p>
                  <span className="rounded border border-rose-500/25 bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-rose-400">
                    At Risk
                  </span>
                  <span className="text-[11px] font-mono tabular-nums text-rose-400">
                    {(matchedRiskProfile.revenueImpact / 1000000).toFixed(1)}M SAR
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {matchedRiskProfile.riskReason}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground/70">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Accountable owner: {matchedRiskProfile.owner}
                  </span>
                  <span>{matchedRiskProfile.region} region</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3 lg:hidden">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/40 bg-muted/5 p-6 text-center">
            <p className="text-sm font-medium">No projects match your search.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a project ID, customer name, segment, or region keyword.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const isFocused = item.id === initialFocusId;
            const subtitle =
              projectFocusDetails[item.id]?.subtitle ?? `${item.segment} portfolio`;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => focusProject(item.id)}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${
                  isFocused
                    ? 'border-primary/40 bg-primary/5 shadow-[0_0_0_1px_rgba(59,130,246,0.15)]'
                    : 'border-border/30 bg-card/55 hover:bg-muted/10'
                }`}
                aria-label={`Open ${item.name} details`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {item.id}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                          statusStyles[item.status] ?? ''
                        }`}
                      >
                        {item.status}
                      </span>
                      {isFocused && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                          Focused
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground/92">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground/76">
                      {subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Value
                    </p>
                    <p className="mt-1 text-sm font-semibold font-mono text-foreground/92">
                      {item.value}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/30 pt-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-border/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/78">
                      {item.region}
                    </span>
                    <span className="rounded-full border border-border/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/78">
                      {item.segment}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Open detail
                    <Search className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      <Card className="hidden executive-card overflow-hidden lg:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/30">
                <TableHead className="section-label h-9 pl-5">Project ID</TableHead>
                <TableHead className="section-label h-9">Name</TableHead>
                <TableHead className="section-label h-9">Region</TableHead>
                <TableHead className="section-label h-9">Segment</TableHead>
                <TableHead className="section-label h-9 text-right">Value</TableHead>
                <TableHead className="section-label h-9">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-sm text-muted-foreground py-8"
                  >
                    No projects match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((item) => {
                  const isFocused = item.id === initialFocusId;

                  return (
                    <TableRow
                      key={item.id}
                      tabIndex={0}
                      onKeyDown={(event) => handleProjectKeyDown(event, item.id)}
                      className={`cursor-pointer border-border/20 transition-colors ${
                        isFocused
                          ? 'bg-primary/5 hover:bg-primary/5'
                          : 'hover:bg-muted/10'
                      }`}
                      onClick={() => focusProject(item.id)}
                    >
                      <TableCell className="font-mono text-xs pl-5">
                        {item.id}
                      </TableCell>
                      <TableCell className="text-sm">
                        <div>
                          <p className="font-medium text-foreground/92">{item.name}</p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground/72">
                            {projectFocusDetails[item.id]?.subtitle ?? `${item.segment} portfolio`}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.region}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.segment}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground text-right font-mono">
                        {item.value}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                              statusStyles[item.status] ?? ''
                            }`}
                          >
                            {item.status}
                          </span>
                          {isFocused && (
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                              Focused
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <FocusDetailSheet detail={focusedDetail} clearHref={clearFocusHref} />
    </div>
  );
}
