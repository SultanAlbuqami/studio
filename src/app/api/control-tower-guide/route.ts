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
    const statusCode = result.status === 'success' ? 200 : 503;

    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    console.error('Guide route error:', error);
    return NextResponse.json(
      {
        status: 'unavailable',
        message: 'The guide request was invalid. Please try again.',
      },
      { status: 400 },
    );
  }
}
