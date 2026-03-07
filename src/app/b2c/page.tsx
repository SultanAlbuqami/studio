import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { b2cSnapshotData } from '@/app/lib/dashboard-data';
import { Users, Home, Clock, Smile, MapPin } from 'lucide-react';

export default function B2CPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <DashboardHeader />
      
      <div className="flex items-center gap-4 mb-2">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">B2C Fulfillment Snapshot</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard label="Active Home Fiber Subs" value={b2cSnapshotData.activeHomeFiberSubs.toLocaleString()} icon={Home} />
        <KpiCard label="Pending Installations" value={b2cSnapshotData.pendingInstallations.toLocaleString()} icon={Clock} />
        <KpiCard label="Avg Time to Install" value={`${b2cSnapshotData.averageTimeToInstall} days`} icon={Clock} trend={{ value: "-0.5d", positive: true }} />
        <KpiCard label="Customer Satisfaction (CSAT)" value={b2cSnapshotData.customerSatisfactionScore} icon={Smile} />
      </div>

      <Card className="executive-card">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Installation Performance by Residential Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b2cSnapshotData.areaPerformance.map((area) => (
              <div key={area.area} className="p-6 rounded-xl bg-muted/30 border border-border space-y-4">
                <h3 className="font-bold text-lg">{area.area}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Demand:</span>
                    <span className="font-medium text-primary">{area.demand}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Status:</span>
                    <span className="font-medium">{area.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
