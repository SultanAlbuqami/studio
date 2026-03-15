import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/strategic');

export default function StrategicLayout({ children }: { children: ReactNode }) {
  return children;
}
