import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Filter, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10" dir="rtl">
      <div className="text-right">
        <h1 className="text-3xl font-bold tracking-tight mb-1 font-headline">مركز عمليات سلام (Stratagem)</h1>
        <p className="text-muted-foreground italic">مدير مكتب إدارة مشاريع العملاء | مقصورة القيادة</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/50">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 w-[140px] text-sm font-medium">
              <SelectValue placeholder="المحفظة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المحافظ</SelectItem>
              <SelectItem value="telco">اتصالات الشركات</SelectItem>
              <SelectItem value="mega">المشاريع الكبرى</SelectItem>
              <SelectItem value="gov">القطاع الحكومي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/50">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <Select defaultValue="q4">
            <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 w-[120px] text-sm font-medium">
              <SelectValue placeholder="الربع السنوي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q4">الربع الرابع 2024</SelectItem>
              <SelectItem value="q3">الربع الثالث 2024</SelectItem>
              <SelectItem value="ytd">منذ بداية العام</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Filter className="w-4 h-4" />
          خيارات متقدمة
        </Button>
      </div>
    </div>
  );
}
