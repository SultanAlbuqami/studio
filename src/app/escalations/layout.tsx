import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/escalations');

export default function EscalationsLayout({ children }: { children: ReactNode }) {
  return children;
}
