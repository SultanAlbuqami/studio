'use client';

import { usePathname } from 'next/navigation';
import { getNavigationItem } from '@/app/lib/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppMobileHeader() {
  const pathname = usePathname();
  const currentRoute = getNavigationItem(pathname);
  const RouteIcon = currentRoute.icon;

  return (
    <div className="border-b border-border/60 bg-background/95 backdrop-blur md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <SidebarTrigger className="h-9 w-9 rounded-lg border border-border/60 bg-card/70 text-foreground shadow-sm hover:bg-card" />

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/72">
            Salam PMO
          </p>
          <div className="mt-1 flex items-center gap-2">
            <RouteIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
            <p className="truncate text-sm font-semibold tracking-tight text-foreground">
              {currentRoute.title}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-border/50 bg-card/45 px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/78">
          {currentRoute.section}
        </span>
      </div>
    </div>
  );
}
