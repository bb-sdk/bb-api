import { describe, it, expect } from 'vitest';
import { signMessage } from '../src/util/webCryptoAPI';

describe('HMAC-SHA256 signing', () => {
  const secret = 'hoge';

  describe('ACCESS-TIME-WINDOW method', () => {
    const timestamp = '1721121776490';
    const timeWindow = '1000';

    it('should correctly sign GET /v1/user/assets', async () => {
      const message = `${timestamp}${timeWindow}/v1/user/assets`;
      const signature = await signMessage(message, secret);
      expect(signature).toBe('9ec5745960d05573c8fb047cdd9191bd0c6ede26f07700bb40ecf1a3920abae8');
    });

    it('should correctly sign POST with body', async () => {
      const body = '{"pair": "xrp_jpy", "price": "20", "amount": "1","side": "buy", "type": "limit"}';
      const message = `${timestamp}${timeWindow}${body}`;
      const signature = await signMessage(message, secret);
      expect(signature).toBe('7868665738ae3f8a796224e0413c1351ddd7ec2af121db12815c0a5b74b8764c');
    });
  });

  describe('ACCESS-NONCE method', () => {
    const nonce = '1721121776490';

    it('should correctly sign GET /v1/user/assets', async () => {
      const message = `${nonce}/v1/user/assets`;
      const signature = await signMessage(message, secret);
      expect(signature).toBe('f957817b95c3af6cf5e2e9dfe1503ea8088f46879d4ab73051467fd7b94f1aba');
    });

    it('should correctly sign POST with body', async () => {
      const body = '{"pair": "xrp_jpy", "price": "20", "amount": "1","side": "buy", "type": "limit"}';
      const message = `${nonce}${body}`;
      const signature = await signMessage(message, secret);
      expect(signature).toBe('8ef83c2b991765b18c95aade7678471747c06890a23a453c76238345b5c86fb8');
    });
  });
});
