import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/delivery');

export default function DeliveryLayout({ children }: { children: ReactNode }) {
  return children;
}
