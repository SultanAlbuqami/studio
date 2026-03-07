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
  ShieldAlert,
  SidebarTrigger
} from 'lucide-react';

export default function ExecutiveOverview() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="max-w-[1600px] mx-auto p-6 md:p-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <DashboardHeader />
        </div>

        {/* Hero Section: AI Insights */}
        <section>
          <ExecutiveBriefAI />
        </section>

        {/* Primary KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard 
            label="Orders In Flight" 
            value={dashboardData.ordersInFlight.toLocaleString()} 
            icon={Package} 
            trend={{ value: "+5.2%", positive: true }}
          />
          <KpiCard 
            label="On-Time Delivery" 
            value={`${dashboardData.onTimeDeliveryPercentage}%`} 
            icon={CheckCircle2} 
            trend={{ value: "-0.8%", positive: false }}
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
            trend={{ value: "+14", positive: false }}
          />
          <KpiCard 
            label="Past Due Backlog" 
            value={dashboardData.pastDueBacklog} 
            icon={Clock} 
            className="border-destructive/20"
          />
        </section>

        {/* Core Dashboard Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          <div className="xl:col-span-3 space-y-8">
            {/* Portfolio Health Charts */}
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 tracking-tight">
                <BarChart3 className="w-5 h-5 text-primary" />
                Strategic Execution Health
              </h2>
              <PortfolioHealth />
            </section>

            {/* Account Exposure Table */}
            <section>
              <h2 className="text-lg font-bold mb-4 tracking-tight">Commercial Exposure Analysis</h2>
              <AccountExposure />
            </section>
          </div>

          <aside className="xl:col-span-1">
            {/* Situation Room / Intervention Queue */}
            <div className="sticky top-8">
               <h2 className="text-lg font-bold mb-4 tracking-tight">Decision Center</h2>
               <InterventionQueue />
               
               <div className="mt-6 p-5 rounded-xl border border-dashed border-border bg-muted/5">
                 <h4 className="text-sm font-semibold mb-2">Director's Sidebar</h4>
                 <p className="text-xs text-muted-foreground mb-4">You have 2 pending approval requests for high-value Fiber expansions in NEOM Zone C.</p>
                 <button className="text-xs font-medium text-primary hover:underline">Review Requests &rarr;</button>
               </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
