import { NextResponse } from 'next/server';
import {
  generateGuideReply,
  type GuideChatMessage,
} from '@/ai/control-tower-guide';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      pathname?: unknown;
      messages?: unknown;
    };

    const pathname =
      typeof body.pathname === 'string' && body.pathname.startsWith('/')
        ? body.pathname
        : '/';
    const messages = Array.isArray(body.messages)
      ? (body.messages as GuideChatMessage[])
      : [];

    const result = await generateGuideReply(pathname, messages);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Guide route error:', error);
    return NextResponse.json(
      {
        status: 'success',
        mode: 'playbook',
        message:
          'I can still guide the walkthrough. Ask for a 60-second opener, how to present this page, the top risk today, or why leadership should trust the numbers.',
      },
      { status: 400 },
    );
  }
}
