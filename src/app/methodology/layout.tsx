import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/methodology');

export default function MethodologyLayout({ children }: { children: ReactNode }) {
  return children;
}
