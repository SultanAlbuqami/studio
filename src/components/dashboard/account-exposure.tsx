"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { accountRiskProfiles, dashboardData } from '@/app/lib/dashboard-data';
import { FocusDetailSheet } from '@/components/dashboard/focus-detail-sheet';
import { ChevronRight } from 'lucide-react';

type AccountExposureProps = Readonly<{
  focusedProfileId?: string | null;
}>;

export function AccountExposure({ focusedProfileId }: AccountExposureProps) {
  const router = useRouter();
  const totalRisk = dashboardData.revenueAtRisk;
  const focusedProfile =
    accountRiskProfiles.find((profile) => profile.focusId === focusedProfileId) ??
    null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

      {/* At-Risk Accounts Table */}
      <Card className="lg:col-span-3 executive-card overflow-hidden">
        <div className="px-5 pt-5 pb-3">
          <p className="text-sm font-semibold">Top At-Risk Accounts</p>
          <p className="text-xs text-muted-foreground mt-0.5">Accounts with the highest revenue exposure</p>
        </div>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/30">
                <TableHead className="section-label h-9 pl-5">Account</TableHead>
                <TableHead className="section-label h-9">Risk Factor</TableHead>
                <TableHead className="section-label h-9 text-right pr-5">Exposure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountRiskProfiles.map((account) => {
                const isFocused = account.focusId === focusedProfileId;

                return (
                <TableRow
                  key={account.focusId}
                  className={`border-border/20 cursor-pointer transition-colors group ${
                    isFocused
                      ? 'bg-primary/5 hover:bg-primary/5'
                      : 'hover:bg-muted/15'
                  }`}
                  onClick={() =>
                    router.push(`/?focus=${account.focusId}#commercial-risk`, {
                      scroll: false,
                    })
                  }
                >
                  <TableCell className="font-medium text-sm py-3 pl-5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          isFocused ? 'bg-primary' : 'bg-rose-400/80'
                        }`}
                      />
                      {account.accountName}
                      <ChevronRight
                        className={`h-3 w-3 transition-colors ${
                          isFocused
                            ? 'text-primary/60'
                            : 'text-muted-foreground/30 group-hover:text-muted-foreground'
                        }`}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground py-3">{account.riskReason}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-semibold text-rose-400 py-3 pr-5">
                    {(account.revenueImpact / 1000000).toFixed(1)}M
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/5">
            <span className="section-label">Total at-risk accounts</span>
            <span className="text-sm font-bold text-rose-400 tabular-nums">
              {(totalRisk / 1000000).toFixed(1)}M SAR
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Exposure by Service Family */}
      <Card className="lg:col-span-2 executive-card">
        <div className="px-5 pt-5 pb-3">
          <p className="text-sm font-semibold">Exposure by Family</p>
          <p className="text-xs text-muted-foreground mt-0.5">Revenue at risk by service line</p>
        </div>
        <CardContent className="px-5 pb-5 pt-0">
          <div className="space-y-4">
            {dashboardData.revenueAtRiskByFamily.map((item) => {
              const percentage = Math.round((item.revenue / totalRisk) * 100);
              return (
                <div key={item.family} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm">{item.family}</span>
                    <span className="text-xs text-muted-foreground font-mono tabular-nums">
                      {(item.revenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/60 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums w-8 text-right">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-border/30">
            <div className="flex justify-between items-baseline">
              <span className="section-label">Total Exposure</span>
              <span className="text-lg font-bold text-rose-400 tabular-nums">
                {(totalRisk / 1000000).toFixed(1)}M SAR
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <FocusDetailSheet
        detail={focusedProfile?.detail ?? null}
        clearHref="/#commercial-risk"
      />
    </div>
  );
}
