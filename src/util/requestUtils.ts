export type AuthMethod = 'time-window' | 'nonce';

export interface RestClientOptions {
  /** Your API key */
  key?: string;

  /** Your API secret */
  secret?: string;

  /**
   * Authentication method.
   * - 'time-window': Uses ACCESS-REQUEST-TIME + ACCESS-TIME-WINDOW headers (recommended)
   * - 'nonce': Uses ACCESS-NONCE header (legacy)
   * Default: 'time-window'
   */
  authMethod?: AuthMethod;

  /**
   * Time window in milliseconds for ACCESS-TIME-WINDOW auth method.
   * Default: 5000
   */
  timeWindow?: number;

  /** Default: false. Enable to automatically throw responses for failed REST API requests */
  throwExceptions?: boolean;

  /** Default: false. If true, we'll throw errors if any params are undefined */
  strict_param_validation?: boolean;

  /**
   * Allows you to provide a custom "signMessage" function
   */
  customSignMessageFn?: (message: string, secret: string) => Promise<string>;
}

/**
 * Serialise a (flat) object into a query string
 */
export function serializeParams(
  params: Record<string, unknown> = {},
  strict_validation = false,
): string {
  return Object.entries(params)
    .map(([key, value]) => {
      if (strict_validation === true && typeof value === 'undefined') {
        throw new Error('Failed to sign API request due to undefined parameter');
      }

      if (typeof value === 'undefined') {
        return null;
      }

      return `${key}=${encodeURIComponent(String(value))}`;
    })
    .filter((v): v is string => v !== null)
    .join('&');
}
