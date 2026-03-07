export type SearchParamValue = string | string[] | undefined;

export type QueueFilterState = {
  owner?: string;
  region?: string;
  window?: string;
};

export type QueueFilterItem = {
  owner: string;
  region: string;
  decisionWindow: string;
};

const regionOrder: Record<string, number> = {
  National: 0,
  Central: 1,
  Eastern: 2,
  Northern: 3,
  Western: 4,
};

const decisionWindowOrder: Record<string, number> = {
  'Within 2h': 0,
  'Within 4h': 1,
  Today: 2,
  '24h': 3,
  '48h': 4,
  '72h': 5,
  'This week': 6,
};

function uniqueSorted(
  values: readonly string[],
  order: Record<string, number> = {},
) {
  return [...new Set(values)].sort((left, right) => {
    const orderDelta = (order[left] ?? 99) - (order[right] ?? 99);

    if (orderDelta !== 0) {
      return orderDelta;
    }

    return left.localeCompare(right);
  });
}

export function getFirstSearchParamValue(value: SearchParamValue) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export function resolveQueueFilters(searchParams?: {
  owner?: SearchParamValue;
  region?: SearchParamValue;
  window?: SearchParamValue;
}) {
  const owner = getFirstSearchParamValue(searchParams?.owner);
  const region = getFirstSearchParamValue(searchParams?.region);
  const window = getFirstSearchParamValue(searchParams?.window);

  return {
    owner: owner || undefined,
    region: region || undefined,
    window: window || undefined,
  } satisfies QueueFilterState;
}

export function applyQueueFilters<T extends QueueFilterItem>(
  items: readonly T[],
  filters: QueueFilterState,
) {
  return items.filter((item) => {
    if (filters.owner && item.owner !== filters.owner) return false;
    if (filters.region && item.region !== filters.region) return false;
    if (filters.window && item.decisionWindow !== filters.window) return false;
    return true;
  });
}

export function getQueueFilterOptions<T extends QueueFilterItem>(
  items: readonly T[],
) {
  return {
    owners: uniqueSorted(items.map((item) => item.owner)),
    regions: uniqueSorted(items.map((item) => item.region), regionOrder),
    windows: uniqueSorted(
      items.map((item) => item.decisionWindow),
      decisionWindowOrder,
    ),
  };
}

export function buildQueueViewHref(
  basePath: string,
  filters: QueueFilterState,
  anchor?: string,
) {
  const params = new URLSearchParams();

  if (filters.owner) params.set('owner', filters.owner);
  if (filters.region) params.set('region', filters.region);
  if (filters.window) params.set('window', filters.window);

  const query = params.toString();
  const hash = anchor ? `#${anchor}` : '';

  return `${basePath}${query ? `?${query}` : ''}${hash}`;
}

// ── Saved PMO filter presets ──

export type FilterPreset = {
  id: string;
  label: string;
  filters: QueueFilterState;
};

export const filterPresets: FilterPreset[] = [
  {
    id: 'today',
    label: 'Today',
    filters: { window: 'Today' },
  },
  {
    id: 'director-pmo',
    label: 'Director PMO',
    filters: { owner: 'Director Customer PMO' },
  },
  {
    id: 'western-recovery',
    label: 'Western Recovery',
    filters: { region: 'Western' },
  },
  {
    id: 'critical-24h',
    label: 'Critical 24h',
    filters: { window: '24h' },
  },
  {
    id: 'eastern-ops',
    label: 'Eastern Ops',
    filters: { region: 'Eastern' },
  },
];

export function isPresetActive(
  preset: FilterPreset,
  selected: QueueFilterState,
) {
  return (
    (preset.filters.owner ?? undefined) === selected.owner &&
    (preset.filters.region ?? undefined) === selected.region &&
    (preset.filters.window ?? undefined) === selected.window
  );
}
