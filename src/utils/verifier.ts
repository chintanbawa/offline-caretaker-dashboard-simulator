import crypto from 'node:crypto';

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(
      value as Record<string, unknown>
    ).sort(([a], [b]) => a.localeCompare(b));

    return `{${entries
      .map(([key, val]) => `${JSON.stringify(key)}:${stableStringify(val)}`)
      .join(',')}}`;
  }

  return JSON.stringify(value);
}

export function createSignature(seed: string, payload: unknown) {
  return crypto
    .createHash('sha256')
    .update(`${seed}:${stableStringify(payload)}`)
    .digest('hex');
}

export function verifySignature(
  seed: string,
  payload: unknown,
  signature: string
) {
  return createSignature(seed, payload) === signature;
}
