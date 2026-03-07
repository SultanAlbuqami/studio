import { ExplorerClient } from './explorer-client';

type ExplorerPageProps = {
  searchParams?: Promise<{
    focus?: string | string[];
    query?: string | string[];
  }>;
};

function firstValue(value?: string | string[]) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0];
  return '';
}

export default async function ExplorerPage({
  searchParams,
}: ExplorerPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const focusId = firstValue(resolvedSearchParams?.focus);
  const query = firstValue(resolvedSearchParams?.query) || focusId;

  return <ExplorerClient initialFocusId={focusId} initialQuery={query} />;
}
