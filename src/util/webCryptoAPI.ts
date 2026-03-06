export async function signMessage(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();

  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const buffer = await globalThis.crypto.subtle.sign(
    { name: 'HMAC' },
    key,
    encoder.encode(message),
  );

  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function checkWebCryptoAPISupported(): void {
  if (!globalThis.crypto?.subtle) {
    throw new Error(
      `Web Crypto API unavailable. Authentication will not work.\n\nAre you using an old Node.js release? Node.js v18+ is required.`,
    );
  }
}
