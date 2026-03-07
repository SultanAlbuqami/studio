import 'server-only';
import OpenAI from 'openai';

let _client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  _client ??= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return _client;
}
