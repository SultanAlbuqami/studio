"use client";

import { useEffect, useMemo, useState } from 'react';
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
import {
  AlertTriangle,
  Briefcase,
  CheckCircle2,
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

const statusCounts = {
  total: explorerData.length,
  active: explorerData.filter((p) => p.status === 'Active').length,
  delayed: explorerData.filter((p) => p.status === 'Delayed').length,
  completed: explorerData.filter((p) => p.status === 'Completed').length,
};

type ExplorerClientProps = Readonly<{
  initialFocusId: string;
  initialQuery: string;
}>;

export function ExplorerClient({
  initialFocusId,
  initialQuery,
}: ExplorerClientProps) {
  const [query, setQuery] = useState(initialQuery);
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
  }, [initialQuery]);

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

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Project ID, Customer, or Region…"
            className="pl-10 h-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums px-2">
          {filtered.length} of {explorerData.length} projects
          {initialFocusId && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
              Focus: {initialFocusId}
            </span>
          )}
        </div>
      </div>

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
                    {matchedRiskProfile.owner}
                  </span>
                  <span>{matchedRiskProfile.region} region</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="executive-card overflow-hidden">
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
                      className={`border-border/20 transition-colors ${
                        isFocused
                          ? 'bg-primary/5 hover:bg-primary/5'
                          : 'hover:bg-muted/10'
                      }`}
                    >
                      <TableCell className="font-mono text-xs pl-5">
                        {item.id}
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {item.name}
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
