'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application route error:', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[980px] items-center px-5 py-10 md:px-8">
      <Card className="executive-card w-full overflow-hidden">
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-destructive/20 bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="space-y-3">
            <p className="section-label">Recovery mode</p>
            <h1 className="font-headline text-3xl font-semibold tracking-[-0.05em] text-foreground">
              Something interrupted this view
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              The control tower is still available, but this route hit an
              unexpected error. You can retry the current view or return to the
              executive overview.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={reset} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Retry view
            </Button>
            <Button asChild variant="outline" className="border-border/50 bg-background/35">
              <Link href="/">Open executive overview</Link>
            </Button>
          </div>

          {error.digest && (
            <p className="text-xs text-muted-foreground/72">
              Incident reference: {error.digest}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
