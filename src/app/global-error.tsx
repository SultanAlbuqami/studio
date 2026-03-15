'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GlobalErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground">
        <main className="mx-auto flex min-h-screen max-w-[900px] items-center px-5 py-10 md:px-8">
          <div className="command-hero w-full space-y-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-destructive/20 bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-3">
              <p className="section-label">Global recovery</p>
              <h1 className="font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
                The app needs a fresh restart
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                A top-level error interrupted the control tower shell. Retry the
                application or jump back to the homepage.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={reset}>
                Retry app
              </Button>
              <Button asChild variant="outline" className="border-border/50 bg-background/35">
                <Link href="/">Go home</Link>
              </Button>
            </div>
            {error.digest && (
              <p className="text-xs text-muted-foreground/72">
                Incident reference: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
