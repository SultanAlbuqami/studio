'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  executiveScenarios,
  type ExecutiveScenario,
} from '@/app/lib/dashboard-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target } from 'lucide-react';

function formatEffectValue(effect: ExecutiveScenario['effects'][number]) {
  if (effect.unit === 'M SAR') {
    return `${effect.projected.toFixed(1)} ${effect.unit}`;
  }

  if (effect.unit === '%') {
    return `${effect.projected.toFixed(1)}${effect.unit}`;
  }

  if (effect.unit === ' hrs') {
    return `${effect.projected.toFixed(1)}${effect.unit}`;
  }

  return `${effect.projected}`;
}

function formatEffectDelta(effect: ExecutiveScenario['effects'][number]) {
  const delta = effect.projected - effect.current;
  const prefix = delta > 0 ? '+' : '';

  if (effect.unit === 'M SAR') {
    return `${prefix}${delta.toFixed(1)} ${effect.unit}`;
  }

  if (effect.unit === '%') {
    return `${prefix}${delta.toFixed(1)}pp`;
  }

  if (effect.unit === ' hrs') {
    return `${prefix}${delta.toFixed(1)} hrs`;
  }

  return `${prefix}${delta}`;
}

const deltaTone = (effect: ExecutiveScenario['effects'][number]) => {
  const delta = effect.projected - effect.current;
  const lowerIsBetter = /risk|pending|backlog|mttr|breach/i.test(effect.label);

  if (delta === 0) {
    return 'text-muted-foreground';
  }

  const improved = lowerIsBetter ? delta < 0 : delta > 0;
  return improved ? 'text-emerald-300' : 'text-amber-300';
};

export function ScenarioPlanner() {
  const [activeScenarioId, setActiveScenarioId] = useState(
    executiveScenarios[0]?.id ?? '',
  );
  const activeScenario =
    executiveScenarios.find((item) => item.id === activeScenarioId) ??
    executiveScenarios[0];

  if (!activeScenario) {
    return null;
  }

  return (
    <Card className="executive-card overflow-hidden">
      <div className="border-b border-border/30 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Scenario Planner</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/72">
              Deterministic what-if views grounded in current control-tower
              decisions, not open-ended generation.
            </p>
          </div>
          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/78">
            3 live levers
          </span>
        </div>
      </div>

      <CardContent className="space-y-3 p-3">
        <div className="grid gap-2">
          {executiveScenarios.map((scenario) => (
            <Button
              key={scenario.id}
              type="button"
              variant={scenario.id === activeScenario.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveScenarioId(scenario.id)}
              className={`justify-start rounded-[1rem] px-3 py-2.5 text-left ${
                scenario.id === activeScenario.id
                  ? 'shadow-[0_0_28px_rgba(73,177,255,0.18)]'
                  : 'border-white/10 bg-background/35 text-foreground hover:bg-background/45'
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">{scenario.title}</p>
                <p className="mt-0.5 truncate text-[11px] font-normal opacity-80">
                  {scenario.lever}
                </p>
              </div>
            </Button>
          ))}
        </div>

        <div className="rounded-[1.25rem] border border-primary/15 bg-primary/[0.06] p-4">
          <div className="flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/74">
              Selected scenario
            </p>
          </div>
          <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
            {activeScenario.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/88">
            {activeScenario.summary}
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-[1rem] border border-white/10 bg-background/35 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                Primary owner
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-foreground/92">
                {activeScenario.owner}
              </p>
            </div>
            <div className="rounded-[1rem] border border-white/10 bg-background/35 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                Decision window
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-foreground/92">
                {activeScenario.decisionWindow}
              </p>
            </div>
            <div className="rounded-[1rem] border border-white/10 bg-background/35 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                Confidence
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-foreground/92">
                {activeScenario.confidence}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          {activeScenario.effects.map((effect) => (
            <div
              key={effect.label}
              className="rounded-[1rem] border border-border/35 bg-background/25 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-foreground/92">
                    {effect.label}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground/72">
                    Current: {effect.current}
                    {effect.unit === '%' ? '%' : effect.unit === 'M SAR' ? ` ${effect.unit}` : effect.unit ?? ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatEffectValue(effect)}
                  </p>
                  <p className={`mt-1 text-[11px] font-medium ${deltaTone(effect)}`}>
                    {formatEffectDelta(effect)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[1rem] border border-border/35 bg-background/25 p-3">
          <div className="flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
              Why this matters
            </p>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-foreground/90">
            {activeScenario.outcome}
          </p>

          <div className="mt-3 space-y-2">
            {activeScenario.supportingSignals.map((signal) => (
              <p
                key={signal}
                className="rounded-[0.95rem] border border-white/10 bg-background/35 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground/82"
              >
                {signal}
              </p>
            ))}
          </div>

          <div className="mt-3 flex justify-end">
            <Link
              href={activeScenario.href}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Open supporting view
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
