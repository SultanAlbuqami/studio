'use client';

import Link from 'next/link';
import { Activity } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  getNavigationItem,
  operationsNavigationItems,
  overviewNavigationItems,
  referenceNavigationItems,
} from '@/app/lib/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

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
    <div className="border-b border-border/60 bg-background/88 px-4 py-4 backdrop-blur-xl md:hidden">
      <div className="command-panel px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/72">
              Salam PMO
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-primary/20 bg-primary/10 text-primary shadow-[0_0_24px_rgba(73,177,255,0.18)]">
                <RouteIcon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-headline text-lg font-semibold tracking-[-0.04em] text-foreground">
                  {currentRoute.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground/72">
                  <Activity className="h-3.5 w-3.5 text-primary" />
                  Executive mobile shell
                </div>
              </div>
            </div>
          </div>

          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/82">
            {currentRoute.section}
          </span>
        </div>

        <div className="mt-4 flex justify-end">
          <ThemeToggle compact />
        </div>

        <div className="mt-5 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/68">
            Quick navigation
          </p>

          {mobileNavigationGroups.map((group) => (
            <div key={group.label} className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/58">
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
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-medium transition-all',
                        isActive
                          ? 'border-primary/30 bg-primary/14 text-primary shadow-[0_0_22px_rgba(73,177,255,0.18)]'
                          : 'border-white/10 bg-background/30 text-muted-foreground hover:border-white/20 hover:text-foreground',
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
