import { DashboardHeader } from '@/components/dashboard/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { explorerData } from '@/app/lib/dashboard-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExplorerPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <DashboardHeader />
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Portfolio Explorer</h2>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by Project ID, Customer Name, or Region..." className="pl-10 h-11" />
        </div>
        <Button variant="outline" className="h-11 gap-2">
          <Filter className="w-4 h-4" />
          Advanced Filter
        </Button>
      </div>

      <Card className="executive-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Project ID</TableHead>
                <TableHead className="font-bold">Project / Customer Name</TableHead>
                <TableHead className="font-bold">Region</TableHead>
                <TableHead className="font-bold">Segment</TableHead>
                <TableHead className="font-bold">Operational Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {explorerData.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-muted/30">
                  <TableCell className="font-mono">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.region}</TableCell>
                  <TableCell>{item.segment}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                      item.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                      item.status === 'Delayed' ? 'bg-destructive/10 text-destructive' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
