import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/app/lib/page-metadata';

export const metadata = buildPageMetadata('/deployment');

export default function DeploymentLayout({ children }: { children: ReactNode }) {
  return children;
}
