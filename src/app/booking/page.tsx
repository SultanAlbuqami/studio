import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { bookingFulfillmentData } from '@/app/lib/dashboard-data';
import { ClipboardList, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export default function BookingPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard 
          label="New Orders MTD" 
          value={bookingFulfillmentData.newOrdersMTD} 
          icon={ClipboardList} 
          trend={{ value: "+12%", positive: true }}
        />
        <KpiCard 
          label="Avg Booking to Billing" 
          value={`${bookingFulfillmentData.averageBookingToBillingDays} Days`} 
          icon={Clock} 
          trend={{ value: "-2.5d", positive: true }}
        />
        <KpiCard 
          label="Order Cancellations" 
          value={bookingFulfillmentData.cancelledOrdersMTD} 
          icon={AlertCircle} 
          className="border-destructive/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="executive-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold tracking-tight">Throughput by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookingFulfillmentData.throughputByRegion.map((r) => (
                <div key={r.region} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="font-medium">{r.region} Region</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono">{r.volume} Orders</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.growth.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {r.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="executive-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold tracking-tight">Order Age Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground italic text-sm">Advanced Order Age Analysis Chart placeholder...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
