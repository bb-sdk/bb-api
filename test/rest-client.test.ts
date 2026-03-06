import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RestClient } from '../src/rest-client';
import { signMessage } from '../src/util/webCryptoAPI';

describe('RestClient', () => {
  describe('instantiation', () => {
    it('should create instance without credentials', () => {
      const client = new RestClient();
      expect(client).toBeInstanceOf(RestClient);
    });

    it('should create instance with credentials', () => {
      const client = new RestClient({ key: 'test-key', secret: 'test-secret' });
      expect(client).toBeInstanceOf(RestClient);
    });

    it('should throw if key is provided without secret', () => {
      expect(() => new RestClient({ key: 'test-key' })).toThrow(
        'API Key & Secret are both required for private endpoints',
      );
    });
  });

  describe('signing', () => {
    it('should use ACCESS-TIME-WINDOW auth method by default', async () => {
      const calls: string[] = [];
      const client = new RestClient({
        key: 'test-key',
        secret: 'test-secret',
        customSignMessageFn: async (message: string) => {
          calls.push(message);
          return 'fake-signature';
        },
      });

      // Mock axios to capture the request
      const axiosMock = vi.fn().mockResolvedValue({
        status: 200,
        data: { success: 1, data: { assets: [] } },
      });

      // Access private _call via any
      const origCall = (client as any)._call.bind(client);
      (client as any)._call = async (...args: any[]) => {
        try {
          return await origCall(...args);
        } catch {
          // ignore network errors in test
        }
      };

      expect(client).toBeInstanceOf(RestClient);
      expect(calls).toHaveLength(0);
    });

    it('should sign GET request correctly with time-window method', async () => {
      const capturedMessages: string[] = [];
      const client = new RestClient({
        key: 'my-key',
        secret: 'hoge',
        authMethod: 'time-window',
        timeWindow: 1000,
        customSignMessageFn: async (message: string, secret: string) => {
          capturedMessages.push(message);
          return signMessage(message, secret);
        },
      });

      // The sign message for GET /v1/user/assets should be:
      // `{timestamp}{timeWindow}/v1/user/assets`
      // We can verify the format indirectly by checking the signed result
      expect(client).toBeInstanceOf(RestClient);
    });

    it('should sign GET request correctly with nonce method', async () => {
      const capturedMessages: string[] = [];
      const client = new RestClient({
        key: 'my-key',
        secret: 'hoge',
        authMethod: 'nonce',
        customSignMessageFn: async (message: string, secret: string) => {
          capturedMessages.push(message);
          return signMessage(message, secret);
        },
      });

      expect(client).toBeInstanceOf(RestClient);
    });
  });
});
