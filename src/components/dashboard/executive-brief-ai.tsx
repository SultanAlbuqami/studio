"use client";

import { useState, useEffect } from 'react';
import { generateExecutiveBrief, AiPoweredExecutiveBriefingOutput } from '@/ai/flows/ai-powered-executive-briefing';
import { dashboardData } from '@/app/lib/dashboard-data';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ExecutiveBriefAI() {
  const [brief, setBrief] = useState<AiPoweredExecutiveBriefingOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBrief = async () => {
    setLoading(true);
    try {
      const result = await generateExecutiveBrief(dashboardData);
      setBrief(result);
    } catch (error) {
      console.error("Failed to generate brief", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrief();
  }, []);

  return (
    <Card className="executive-card border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          Intelligent Operating Brief
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={fetchBrief} 
          disabled={loading}
          className="h-8 w-8 hover:bg-primary/10"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3 py-4">
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
          </div>
        ) : brief ? (
          <div className="prose prose-sm prose-invert max-w-none">
            <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {brief.executiveBrief}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Unable to synthesize intelligence at this time.</p>
        )}
      </CardContent>
    </Card>
  );
}