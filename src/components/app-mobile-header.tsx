'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  getNavigationItem,
  operationsNavigationItems,
  overviewNavigationItems,
  referenceNavigationItems,
} from '@/app/lib/navigation';
import { cn } from '@/lib/utils';

const mobileNavigationGroups = [
  {
    label: 'Overview',
    items: overviewNavigationItems,
  },
  {
    label: 'Operations',
    items: operationsNavigationItems,
  },
  {
    label: 'Reference',
    items: referenceNavigationItems,
  },
] as const;

export function AppMobileHeader() {
  const pathname = usePathname();
  const currentRoute = getNavigationItem(pathname);
  const RouteIcon = currentRoute.icon;

  return (
    <div className="border-b border-border/60 bg-background/95 backdrop-blur md:hidden">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
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

        <div className="mt-4 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/66">
            Quick Navigation
          </p>

          {mobileNavigationGroups.map((group) => (
            <div key={group.label} className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/58">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = item.url === pathname;

                  return (
                    <Link
                      key={item.url}
                      href={item.url}
                      className={cn(
                        'inline-flex min-h-9 items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-medium transition-colors',
                        isActive
                          ? 'border-primary/35 bg-primary/12 text-primary'
                          : 'border-border/45 bg-card/35 text-muted-foreground hover:border-border/70 hover:text-foreground',
                      )}
                    >
                      <ItemIcon className="h-3.5 w-3.5 shrink-0" />
                      <span className="leading-none">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
