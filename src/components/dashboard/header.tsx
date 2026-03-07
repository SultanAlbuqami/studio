import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Filter, Layers, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1 font-headline">Stratagem Insights</h1>
        <p className="text-muted-foreground">Director Customer PMO | Operating Cockpit</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/50">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 w-[120px] text-sm font-medium">
              <SelectValue placeholder="Portfolio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Portfolios</SelectItem>
              <SelectItem value="telco">Telecom B2B</SelectItem>
              <SelectItem value="mega">Mega Projects</SelectItem>
              <SelectItem value="gov">Government</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/50">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="q4">
            <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 w-[100px] text-sm font-medium">
              <SelectValue placeholder="Quarter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q4">Q4 2024</SelectItem>
              <SelectItem value="q3">Q3 2024</SelectItem>
              <SelectItem value="ytd">YTD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Filter className="w-4 h-4" />
          Advanced
        </Button>
      </div>
    </div>
  );
}