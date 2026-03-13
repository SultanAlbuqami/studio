import 'server-only';
import OpenAI from 'openai';
import { getAiApiKey } from '@/ai/config';

const GEMINI_OPENAI_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/openai/';

let _client: OpenAI | null = null;

export function getAiClient(): OpenAI {
  const apiKey = getAiApiKey();

  if (!apiKey) {
    throw new Error('Missing Gemini API key');
  }

  _client ??= new OpenAI({
    apiKey,
    baseURL: GEMINI_OPENAI_BASE_URL,
  });

  return _client;
}
