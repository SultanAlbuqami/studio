import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardData } from '@/app/lib/dashboard-data';
import { AlertCircle, ChevronRight, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InterventionQueue() {
  return (
    <Card className="executive-card border-none bg-gradient-to-b from-card to-destructive/5">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Gavel className="w-4 h-4 text-destructive" />
          Critical Intervention Queue
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {dashboardData.immediateInterventionQueue.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4 hover:bg-destructive/5 transition-colors group">
              <div className="mt-1">
                <AlertCircle className="w-4 h-4 text-destructive opacity-80" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{item.split(':')[0]}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.split(':')[1]}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="p-4 bg-muted/20">
          <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-primary">
            View full situation room backlog (12 items)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}