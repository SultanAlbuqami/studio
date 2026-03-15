'use client';

import Link from 'next/link';
import { ChevronRight, TowerControl } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getNavigationItem } from '@/app/lib/navigation';

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const item = getNavigationItem(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-muted-foreground/76"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-background/20 px-2.5 py-1 transition-colors hover:border-primary/18 hover:text-foreground"
      >
        <TowerControl className="h-3.5 w-3.5 text-primary/82" />
        Control Tower
      </Link>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/42" />
      <span className="rounded-full border border-white/8 bg-background/16 px-2.5 py-1 text-foreground/78">
        {item.section}
      </span>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/42" />
      <span aria-current="page" className="text-foreground/92">
        {item.title}
      </span>
    </nav>
  );
}
