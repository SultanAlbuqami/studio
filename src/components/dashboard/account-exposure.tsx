import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dashboardData } from '@/app/lib/dashboard-data';
import { Badge } from '@/components/ui/badge';

export function AccountExposure() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 executive-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Top At-Risk Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Account</TableHead>
                <TableHead className="font-semibold">Primary Risk Factor</TableHead>
                <TableHead className="font-semibold text-right">Exposure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardData.topAtRiskAccounts.map((account) => (
                <TableRow key={account.accountName}>
                  <TableCell className="font-medium">{account.accountName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">{account.riskReason}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium text-destructive">
                    {(account.revenueImpact / 1000000).toFixed(1)}M SAR
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="executive-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Revenue Exposure by Family</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {dashboardData.revenueAtRiskByFamily.map((item) => {
              const totalRisk = dashboardData.revenueAtRisk;
              const percentage = (item.revenue / totalRisk) * 100;
              
              return (
                <div key={item.family} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{item.family}</span>
                    <span>{(item.revenue / 1000000).toFixed(1)}M SAR</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 pt-6 border-t border-border">
             <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Total Exposure</span>
                <span className="text-2xl font-bold text-destructive">{(dashboardData.revenueAtRisk / 1000000).toFixed(1)}M SAR</span>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}