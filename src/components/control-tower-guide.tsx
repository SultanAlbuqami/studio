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
  buildGuideNavigationConfirmation,
  buildGuidePlaybookReply,
  buildGuideWelcomeMessages,
  controlTowerGuideName,
  getGuideNextRoute,
  getGuideRouteSummary,
  shouldPreferPlaybookReply,
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

function createInitialMessages(): ChatMessage[] {
  return buildGuideWelcomeMessages().map((message, index) => ({
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
  const [preferPlaybook, setPreferPlaybook] = useState(!isAiConfigured);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;
    setMessages(createInitialMessages());

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

    const playbookReply = buildGuidePlaybookReply(pathname, userMessage);
    const preferPreparedReply =
      preferPlaybook || shouldPreferPlaybookReply(userMessage);

    if (!isAiConfigured || preferPreparedReply) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-playbook-${Date.now()}`,
          role: 'assistant',
          content: playbookReply,
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
        status?: 'success';
        mode?: 'ai' | 'playbook';
        message?: string;
      };

      if (result.mode === 'playbook') {
        setPreferPlaybook(true);
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content:
            result.message?.trim() ||
            playbookReply,
        },
      ]);
    } catch {
      setPreferPlaybook(true);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          content: playbookReply,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function navigateWithGuideFeedback(targetPath: string) {
    setIsOpen(true);
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `assistant-nav-${Date.now()}`,
        role: 'assistant',
        content: buildGuideNavigationConfirmation(targetPath),
      },
    ]);

    startTransition(() => {
      router.push(targetPath);
    });
  }

  const quickActions = [
    {
      label: 'Current posture',
      onClick: () => void sendMessage('Summarize the current operating posture.'),
    },
    {
      label: 'About this view',
      onClick: () =>
        void sendMessage(`What does this view show and what decisions does it support?`),
    },
    {
      label: 'Key risks',
      onClick: () => void sendMessage('What are the most critical risks right now?'),
    },
    {
      label: 'Data governance',
      onClick: () =>
        void sendMessage('How are the KPIs in this dashboard governed?'),
    },
  ];

  return (
    <>
      {!isOpen && (
        <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-50 flex justify-end sm:left-auto sm:right-5 sm:w-auto">
          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto h-auto rounded-full border border-white/12 bg-slate-950/96 px-4 py-3 text-sm font-medium text-slate-50 shadow-[0_24px_80px_rgba(2,16,42,0.45)] backdrop-blur-xl hover:bg-slate-900"
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
            className="pointer-events-auto flex h-[min(72svh,42rem)] w-full flex-col overflow-hidden rounded-[28px] border border-white/12 bg-slate-950/98 shadow-[0_32px_120px_rgba(2,12,34,0.58)] ring-1 ring-white/6 backdrop-blur-2xl sm:h-full"
          >
            <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_48%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(10,15,29,0.96))] px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-400/25 bg-sky-500/12 text-sky-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <Bot className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-200/80">
                        Operations Guide
                      </p>
                      <h2
                        id="control-tower-guide-title"
                        className="truncate text-base font-semibold tracking-tight text-slate-50"
                      >
                        {controlTowerGuideName}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Navigate the control tower, understand current operating posture, and identify the next decision-worthy view.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 shrink-0 rounded-full border border-white/10 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-slate-50"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close guide</span>
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-slate-900/82 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-200">
                  {currentRoute.title}
                </span>
                <span className="rounded-full border border-sky-400/20 bg-sky-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-sky-100">
                  Operations context
                </span>
              </div>
            </div>

            <div className="border-b border-white/10 bg-slate-950/96 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={action.onClick}
                    className="h-8 rounded-full border-white/10 bg-slate-900/88 px-3 text-xs font-medium text-slate-100 hover:bg-slate-800 hover:text-white"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            <ScrollArea className="flex-1 bg-[linear-gradient(180deg,rgba(15,23,42,0.32),rgba(2,6,23,0.08))] px-4 py-4">
              <div
                ref={scrollViewportRef}
                className="space-y-3 pr-3"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'max-w-[92%] rounded-2xl px-3.5 py-3 text-sm leading-7 shadow-sm',
                      message.role === 'assistant'
                        ? 'border border-white/10 bg-slate-900/96 text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                        : 'ml-auto border border-sky-400/15 bg-sky-500 text-white shadow-[0_12px_28px_rgba(14,116,219,0.28)]',
                    )}
                  >
                    <p className="whitespace-pre-wrap font-medium">{message.content}</p>
                  </div>
                ))}

                {isLoading && (
                  <div className="max-w-[88%] rounded-2xl border border-white/10 bg-slate-900/96 px-3.5 py-3 text-sm text-slate-200">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Preparing response...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t border-white/10 bg-slate-950/98 px-4 py-3">
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
                  placeholder="Ask about this view, operating risks, delivery posture, or what to review next..."
                  className="min-h-[88px] resize-none rounded-2xl border-white/10 bg-slate-900/94 text-sm leading-relaxed text-slate-50 placeholder:text-slate-400 focus-visible:ring-sky-400/50"
                  maxLength={1600}
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    Ask in English or Arabic. Responses are grounded in
                    the operating model and current portfolio data.
                  </p>
                  <Button
                    type="submit"
                    disabled={isLoading || input.trim().length === 0}
                    className="h-10 rounded-full bg-sky-600 px-4 text-white hover:bg-sky-500 disabled:bg-sky-900/55 disabled:text-slate-300"
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
                className="mt-3 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-900/94 px-3.5 py-3 text-left transition-colors hover:bg-slate-800"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Next best view
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">
                    {nextRoute.title}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-sky-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
