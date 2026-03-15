import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/booking');

export default function BookingLayout({ children }: { children: ReactNode }) {
  return children;
}
