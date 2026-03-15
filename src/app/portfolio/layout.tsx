import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/portfolio');

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return children;
}
