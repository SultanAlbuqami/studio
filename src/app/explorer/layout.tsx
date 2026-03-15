import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/explorer');

export default function ExplorerLayout({ children }: { children: ReactNode }) {
  return children;
}
