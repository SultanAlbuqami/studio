import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { escalationData } from '@/app/lib/dashboard-data';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Hammer } from 'lucide-react';

export default function EscalationsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <DashboardHeader />
      
      <div className="flex items-center gap-4 mb-2">
        <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />
        <h2 className="text-2xl font-bold tracking-tight">High-Priority Escalation Tracker</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {escalationData.map((esc) => (
          <Card key={esc.id} className="executive-card overflow-hidden">
            <div className={`h-1 w-full ${esc.severity === 'Critical' ? 'bg-destructive' : 'bg-orange-500'}`} />
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{esc.id}</span>
                    <Badge variant={esc.severity === 'Critical' ? 'destructive' : 'secondary'}>{esc.severity}</Badge>
                    <Badge variant="outline">{esc.status}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{esc.subject}</h3>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Aging: {esc.age}</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors">
                    <Hammer className="w-3.5 h-3.5" />
                    Assign to Team
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
