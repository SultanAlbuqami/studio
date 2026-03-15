import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/briefing');

export default function BriefingLayout({ children }: { children: ReactNode }) {
  return children;
}
