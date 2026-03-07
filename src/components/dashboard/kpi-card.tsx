import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  subValue?: string;
}

export function KpiCard({ label, value, icon: Icon, trend, className, subValue }: KpiCardProps) {
  return (
    <Card className={cn("executive-card group overflow-hidden border-none bg-gradient-to-br from-card to-card/50", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {trend && (
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend.positive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
            )}>
              {trend.value}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {subValue && <span className="text-sm text-muted-foreground">{subValue}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}