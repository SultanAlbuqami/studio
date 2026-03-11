"use client";

import { startTransition, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  Bot,
  Loader2,
  MessageSquare,
  SendHorizonal,
  Sparkles,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  buildGuideWelcomeMessages,
  controlTowerGuideName,
  getGuideNextRoute,
  getGuideRouteSummary,
} from '@/lib/control-tower-guide-content';

type ControlTowerGuideProps = Readonly<{
  isAiConfigured: boolean;
}>;

type ChatMessage = Readonly<{
  id: string;
  role: 'assistant' | 'user';
  content: string;
}>;

const sessionStorageKey = 'control-tower-guide-opened';

function createInitialMessages(pathname: string): ChatMessage[] {
  return buildGuideWelcomeMessages(pathname).map((message, index) => ({
    id: `assistant-welcome-${index}`,
    role: 'assistant',
    content: message,
  }));
}

export function ControlTowerGuide({
  isAiConfigured,
}: ControlTowerGuideProps) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);
  const currentRoute = getGuideRouteSummary(pathname);
  const nextRoute = getGuideNextRoute(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;
    setMessages(createInitialMessages(pathname));

    if (typeof window === 'undefined') {
      return;
    }

    const alreadyOpened = window.sessionStorage.getItem(sessionStorageKey);
    if (alreadyOpened) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      window.sessionStorage.setItem(sessionStorageKey, '1');
    }, 420);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading, isOpen]);

  async function sendMessage(nextInput?: string) {
    const userMessage = (nextInput ?? input).trim();
    if (!userMessage || isLoading) {
      return;
    }

    const messageToSend: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
    };
    const nextConversation = [...messages, messageToSend];

    setMessages(nextConversation);
    setInput('');
    setIsOpen(true);

    if (!isAiConfigured) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-offline-${Date.now()}`,
          role: 'assistant',
          content:
            'Live AI replies are currently disabled because OPENAI_API_KEY is not configured on the server. You can still use the route shortcuts below to guide the visitor through the project.',
        },
      ]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/control-tower-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pathname,
          messages: nextConversation.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const result = (await response.json()) as {
        status?: 'success' | 'unavailable';
        message?: string;
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content:
            result.message?.trim() ||
            'The guide could not generate a reply right now. Please try again.',
        },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          content:
            'The guide could not generate a reply right now. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function navigateWithGuideFeedback(targetPath: string) {
    const targetRoute = getGuideRouteSummary(targetPath);

    setIsOpen(true);
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `assistant-nav-${Date.now()}`,
        role: 'assistant',
        content: `Opening ${targetRoute.title}. ${targetRoute.proof}`,
      },
    ]);

    startTransition(() => {
      router.push(targetPath);
    });
  }

  const quickActions = [
    {
      label: 'Explain this page',
      onClick: () =>
        void sendMessage(
          `Explain what ${currentRoute.title} is for and how I should present it during the demo.`,
        ),
    },
    {
      label: '3-minute story',
      onClick: () =>
        void sendMessage(
          'Give me a 3-minute interview walkthrough for this product.',
        ),
    },
    {
      label: `Open ${nextRoute.title}`,
      onClick: () => navigateWithGuideFeedback(nextRoute.url),
    },
    {
      label: 'Open governance',
      onClick: () => navigateWithGuideFeedback('/methodology'),
    },
  ];

  return (
    <>
      {!isOpen && (
        <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-50 flex justify-end sm:left-auto sm:right-5 sm:w-auto">
          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto h-auto rounded-full border border-primary/30 bg-background/92 px-4 py-3 text-sm text-foreground shadow-[0_24px_80px_rgba(2,16,42,0.45)] backdrop-blur-xl hover:bg-background"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Open guide
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="pointer-events-none fixed inset-x-3 bottom-3 z-50 flex justify-end sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[42rem] sm:w-[26.5rem]">
          <div
            role="complementary"
            aria-labelledby="control-tower-guide-title"
            className="pointer-events-auto flex h-[min(72svh,42rem)] w-full flex-col overflow-hidden rounded-[28px] border border-border/55 bg-background/95 shadow-[0_32px_120px_rgba(2,12,34,0.58)] backdrop-blur-2xl sm:h-full"
          >
            <div className="border-b border-border/35 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_54%),linear-gradient(180deg,rgba(7,15,31,0.92),rgba(7,15,31,0.72))] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                      <Bot className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/72">
                        Guided Walkthrough
                      </p>
                      <h2
                        id="control-tower-guide-title"
                        className="truncate text-base font-semibold tracking-tight text-foreground"
                      >
                        {controlTowerGuideName}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Opens with a welcome sequence, explains the current page,
                    and guides the viewer to the next best route.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 shrink-0 rounded-full border border-border/35 bg-background/35 text-muted-foreground hover:bg-background/60 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close guide</span>
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-border/35 bg-background/35 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/85">
                  Current view: {currentRoute.title}
                </span>
                <span
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]',
                    isAiConfigured
                      ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300'
                      : 'border-amber-500/25 bg-amber-500/10 text-amber-300',
                  )}
                >
                  {isAiConfigured ? 'AI enabled' : 'Static guidance'}
                </span>
              </div>
            </div>

            <div className="border-b border-border/25 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={action.onClick}
                    className="h-8 rounded-full border-border/35 bg-background/45 px-3 text-xs text-foreground hover:bg-background"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            <ScrollArea className="flex-1 px-4 py-4">
              <div
                ref={scrollViewportRef}
                className="space-y-3 pr-3"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'max-w-[92%] rounded-2xl px-3.5 py-3 text-sm leading-relaxed shadow-sm',
                      message.role === 'assistant'
                        ? 'border border-border/30 bg-card/65 text-foreground'
                        : 'ml-auto bg-primary text-primary-foreground',
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                ))}

                {isLoading && (
                  <div className="max-w-[88%] rounded-2xl border border-border/30 bg-card/65 px-3.5 py-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking through the best walkthrough...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t border-border/25 bg-background/92 px-4 py-3">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage();
                }}
                className="space-y-2.5"
              >
                <Textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask what this project does, what to open next, or how to present it in the interview..."
                  className="min-h-[88px] resize-none rounded-2xl border-border/35 bg-card/55 text-sm leading-relaxed"
                  maxLength={1600}
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] leading-relaxed text-muted-foreground/78">
                    Ask in English or Arabic. The guide stays grounded in the
                    actual project structure.
                  </p>
                  <Button
                    type="submit"
                    disabled={isLoading || input.trim().length === 0}
                    className="h-10 rounded-full px-4"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="mr-1.5 h-4 w-4" />
                        Send
                        <SendHorizonal className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <button
                type="button"
                onClick={() => navigateWithGuideFeedback(nextRoute.url)}
                className="mt-3 flex w-full items-center justify-between rounded-2xl border border-border/30 bg-card/45 px-3.5 py-3 text-left transition-colors hover:bg-card/70"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/72">
                    Next best view
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {nextRoute.title}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
