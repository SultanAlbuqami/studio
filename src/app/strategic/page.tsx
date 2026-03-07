import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { strategicOrders } from '@/app/lib/dashboard-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';

export default function StrategicOrdersPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <DashboardHeader />
      
      <div className="flex items-center gap-4 mb-2">
        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        <h2 className="text-2xl font-bold tracking-tight">Strategic Orders & Acceptance</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="executive-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Major Accounts - In Flight</CardTitle>
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold">Total Value: 24.7M SAR</span>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Estimated Value</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {strategicOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">{order.id}</TableCell>
                    <TableCell className="font-semibold">{order.account}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell className="font-bold">{order.value} SAR</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                         <div className="w-full bg-muted rounded-full h-1.5 max-w-[60px]">
                           <div className="bg-primary h-full rounded-full" style={{ width: `${order.progress}%` }} />
                         </div>
                         <span className="text-xs">{order.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'On Track' ? 'default' : 'destructive'}>
                        {order.status === 'On Track' ? 'Stable' : 'Critical'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="executive-card bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base font-bold">Acceptance Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <p className="text-muted-foreground italic">"Focus must remain on closing UAT for the PIF project before quarter-end to ensure revenue recognition."</p>
            <div className="flex gap-4">
              <div className="p-3 bg-card rounded-lg border border-border flex-1">
                <p className="text-xs text-muted-foreground">Pending Acceptance</p>
                <p className="text-xl font-bold">184 Items</p>
              </div>
              <div className="p-3 bg-card rounded-lg border border-border flex-1">
                <p className="text-xs text-muted-foreground">Rejection Rate</p>
                <p className="text-xl font-bold">2.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
