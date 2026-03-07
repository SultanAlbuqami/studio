import { DashboardHeader } from '@/components/dashboard/header';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { ExecutiveBriefAI } from '@/components/dashboard/executive-brief-ai';
import { PortfolioHealth } from '@/components/dashboard/portfolio-health';
import { InterventionQueue } from '@/components/dashboard/intervention-queue';
import { AccountExposure } from '@/components/dashboard/account-exposure';
import { dashboardData } from '@/app/lib/dashboard-data';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Package, 
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="max-w-[1440px] mx-auto p-6 md:p-10 space-y-10">
        
        {/* Header Section */}
        <DashboardHeader />

        {/* Hero Section: AI Insights */}
        <section>
          <ExecutiveBriefAI />
        </section>

        {/* Primary KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <KpiCard 
            label="Orders In Flight" 
            value={dashboardData.ordersInFlight.toLocaleString()} 
            icon={Package} 
            trend={{ value: "+8%", positive: true }}
          />
          <KpiCard 
            label="On-Time Delivery" 
            value={`${dashboardData.onTimeDeliveryPercentage}%`} 
            icon={CheckCircle2} 
            trend={{ value: "+2.4%", positive: true }}
          />
          <KpiCard 
            label="Accepted Value MTD" 
            value={`${(dashboardData.acceptedValueMTD / 1000000).toFixed(1)}M`} 
            subValue="SAR"
            icon={TrendingUp} 
          />
          <KpiCard 
            label="Revenue At Risk" 
            value={`${(dashboardData.revenueAtRisk / 1000000).toFixed(1)}M`} 
            subValue="SAR"
            icon={ShieldAlert}
            className="border-destructive/20 bg-destructive/5"
          />
          <KpiCard 
            label="Acceptance Pending" 
            value={dashboardData.acceptancePending} 
            icon={CreditCard} 
            trend={{ value: "-12", positive: true }}
          />
          <KpiCard 
            label="Past Due Backlog" 
            value={dashboardData.pastDueBacklog} 
            icon={Clock} 
            className="border-destructive/20"
          />
        </section>

        {/* Core Dashboard Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
          
          <div className="xl:col-span-3 space-y-10">
            {/* Portfolio Health Charts */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Portfolio Operating Health
              </h2>
              <PortfolioHealth />
            </section>

            {/* Account Exposure Table */}
            <section>
              <h2 className="text-xl font-bold mb-6">Commercial Exposure Analysis</h2>
              <AccountExposure />
            </section>
          </div>

          <aside className="xl:col-span-1">
            {/* Situation Room / Intervention Queue */}
            <div className="sticky top-10">
               <h2 className="text-xl font-bold mb-6">Decision Center</h2>
               <InterventionQueue />
               
               <div className="mt-8 p-6 rounded-xl border border-dashed border-border bg-muted/5">
                 <h4 className="text-sm font-semibold mb-2">Director's Workspace</h4>
                 <p className="text-xs text-muted-foreground mb-4">You have 3 draft board presentations for the upcoming NEOM steering committee.</p>
                 <button className="text-xs font-medium text-primary hover:underline">Access workspace &rarr;</button>
               </div>
            </div>
          </aside>

        </div>

        {/* Drill-down Area Footer */}
        <footer className="pt-10 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/60">
            STRATAGEM INSIGHTS v4.2.0 • Real-time PMO Operational Hub • Kingdom of Saudi Arabia
          </p>
        </footer>
      </div>
    </div>
  );
}