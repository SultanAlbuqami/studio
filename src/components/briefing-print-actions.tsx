'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Printer, ArrowLeft } from 'lucide-react';

export function BriefingPrintActions() {
  return (
    <div className="print-hidden flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => window.print()}
        className="border-white/10 bg-background/35 text-foreground hover:bg-background/45"
      >
        <Printer className="h-4 w-4" />
        Print briefing
      </Button>
      <Button
        asChild
        type="button"
        variant="ghost"
        className="text-muted-foreground hover:text-foreground"
      >
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to overview
        </Link>
      </Button>
    </div>
  );
}
