'use client';

import { useEffect, useState } from 'react';
import { MoonStar, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'control-tower-theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
}

export function ThemeToggle({
  compact = false,
}: Readonly<{ compact?: boolean }>) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme =
      typeof window === 'undefined'
        ? null
        : window.localStorage.getItem(STORAGE_KEY);
    const nextTheme: Theme = savedTheme === 'light' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      type="button"
      variant="outline"
      size={compact ? 'sm' : 'default'}
      className={cn(
        'border-border/40 bg-background/35 text-foreground hover:bg-background/55',
        compact ? 'h-9 gap-2 px-3 text-xs' : 'h-10 gap-2 px-4 text-sm',
      )}
      onClick={() => {
        const updatedTheme = nextTheme;
        setTheme(updatedTheme);
        window.localStorage.setItem(STORAGE_KEY, updatedTheme);
        applyTheme(updatedTheme);
      }}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {theme === 'dark' ? (
        <SunMedium className="h-4 w-4" />
      ) : (
        <MoonStar className="h-4 w-4" />
      )}
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}
