import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/b2c');

export default function B2CLayout({ children }: { children: ReactNode }) {
  return children;
}
