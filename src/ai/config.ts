import 'server-only';

const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';

function getConfiguredValue(
  ...values: Array<string | undefined>
): string | null {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
}

export function getAiApiKey(): string | null {
  return getConfiguredValue(
    process.env.GEMINI_API_KEY,
    process.env.GOOGLE_API_KEY,
  );
}

export function hasConfiguredAiKey(): boolean {
  return getAiApiKey() !== null;
}

export function getAiModel(): string {
  return (
    getConfiguredValue(process.env.GEMINI_MODEL) ?? DEFAULT_GEMINI_MODEL
  );
}
