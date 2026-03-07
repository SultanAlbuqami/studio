import 'server-only';

export function hasConfiguredAiKey(): boolean {
  const value = process.env.OPENAI_API_KEY;
  return typeof value === 'string' && value.trim().length > 0;
}
