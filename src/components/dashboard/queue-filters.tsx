'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  buildQueueViewHref,
  filterPresets,
  isPresetActive,
  type QueueFilterState,
} from '@/app/lib/queue-filters';
import { Bookmark, Clock3, FilterX, MapPin, User } from 'lucide-react';

type QueueFiltersProps = Readonly<{
  basePath: string;
  anchor?: string;
  itemLabel: string;
  owners: readonly string[];
  regions: readonly string[];
  windows: readonly string[];
  selected: QueueFilterState;
  totalCount: number;
  filteredCount: number;
}>;

const ALL_VALUE = '__all__';

export function QueueFilters({
  basePath,
  anchor,
  itemLabel,
  owners,
  regions,
  windows,
  selected,
  totalCount,
  filteredCount,
}: QueueFiltersProps) {
  const router = useRouter();

  const updateFilter = (key: keyof QueueFilterState, value: string) => {
    const nextFilters: QueueFilterState = {
      owner: selected.owner,
      region: selected.region,
      window: selected.window,
    };

    if (value === ALL_VALUE) {
      delete nextFilters[key];
    } else {
      nextFilters[key] = value;
    }

    router.replace(buildQueueViewHref(basePath, nextFilters, anchor), {
      scroll: false,
    });
  };

  const hasActiveFilters = Boolean(
    selected.owner || selected.region || selected.window,
  );

  return (
    <div className="space-y-4 rounded-lg border border-border/30 bg-muted/10 p-3.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/72">
          <Bookmark className="h-3 w-3" />
          Saved views
        </span>
        {filterPresets.map((preset) => {
          const active = isPresetActive(preset, selected);
          return (
            <Button
              key={preset.id}
              type="button"
              variant={active ? 'default' : 'outline'}
              size="sm"
              className={`h-6 px-2.5 text-[11px] font-medium ${
                active
                  ? ''
                  : 'border-border/40 bg-background/40 text-muted-foreground hover:text-foreground'
              }`}
              onClick={() =>
                router.replace(
                  buildQueueViewHref(
                    basePath,
                    active ? {} : preset.filters,
                    anchor,
                  ),
                  { scroll: false },
                )
              }
            >
              {preset.label}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid flex-1 gap-3 md:grid-cols-3">
          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <User className="h-3 w-3" />
              Accountable Owner
            </p>
            <Select
              value={selected.owner ?? ALL_VALUE}
              onValueChange={(value) => updateFilter('owner', value)}
            >
              <SelectTrigger className="h-9 bg-background/70 text-sm">
                <SelectValue placeholder="All owners" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>All owners</SelectItem>
                {owners.map((owner) => (
                  <SelectItem key={owner} value={owner}>
                    {owner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <MapPin className="h-3 w-3" />
              Region
            </p>
            <Select
              value={selected.region ?? ALL_VALUE}
              onValueChange={(value) => updateFilter('region', value)}
            >
              <SelectTrigger className="h-9 bg-background/70 text-sm">
                <SelectValue placeholder="All regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>All regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <Clock3 className="h-3 w-3" />
              Decision Window
            </p>
            <Select
              value={selected.window ?? ALL_VALUE}
              onValueChange={(value) => updateFilter('window', value)}
            >
              <SelectTrigger className="h-9 bg-background/70 text-sm">
                <SelectValue placeholder="All windows" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>All windows</SelectItem>
                {windows.map((window) => (
                  <SelectItem key={window} value={window}>
                    {window}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 xl:justify-end">
          <p className="text-[11px] text-muted-foreground/76">
            Showing {filteredCount} of {totalCount} {itemLabel}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!hasActiveFilters}
            className="h-8 gap-1.5 px-2 text-xs text-muted-foreground"
            onClick={() =>
              router.replace(buildQueueViewHref(basePath, {}, anchor), {
                scroll: false,
              })
            }
          >
            <FilterX className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
