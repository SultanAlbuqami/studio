import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { deliveryMilestones } from '@/app/lib/dashboard-data';
import { Progress } from '@/components/ui/progress';
import { Truck, MapPin, HardHat, Cpu, ShieldCheck } from 'lucide-react';

export default function DeliveryPage() {
  const icons = [MapPin, HardHat, Cpu, ShieldCheck];

  return (
    <div className="p-6 md:p-8 space-y-8">
      <DashboardHeader />
      
      <div className="flex items-center gap-4 mb-2">
        <Truck className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">برج مراقبة التنفيذ (Delivery Control Tower)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryMilestones.map((m, idx) => {
          const Icon = icons[idx];
          return (
            <Card key={m.stage} className="executive-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    m.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                    m.status === 'at-risk' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <CardTitle className="text-sm font-medium mt-4">{m.stage}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{m.count}</div>
                <p className="text-xs text-muted-foreground mt-1">مشروع قيد المعالجة</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 executive-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold">مراحل التنفيذ الحالية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {deliveryMilestones.map((m) => (
              <div key={m.stage} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{m.stage}</span>
                  <span className="text-muted-foreground">{m.count} طلب</span>
                </div>
                <Progress value={idxToProgress(m.status)} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="executive-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold">تنبيهات الميدان</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-sm">
                <p className="font-bold text-destructive">تأخير في جدة</p>
                <p className="text-xs mt-1 text-muted-foreground">نقص في مخزون كوابل الألياف البصرية في مستودع الغربية.</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20 text-sm">
                <p className="font-bold text-green-400">نيوم - تحديث</p>
                <p className="text-xs mt-1 text-muted-foreground">اكتمال 95% من الأعمال المدنية للمسار الجنوبي.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function idxToProgress(status: string) {
  if (status === 'completed') return 100;
  if (status === 'at-risk') return 45;
  if (status === 'in-progress') return 75;
  return 20;
}
