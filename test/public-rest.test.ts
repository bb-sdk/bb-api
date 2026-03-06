import { describe, it, expect } from 'vitest';
import { PublicRestClient } from '../src/public-rest-client';

const client = new PublicRestClient();

describe('PublicRestClient', () => {
  describe('getTicker', () => {
    it('should return ticker data for btc_jpy', async () => {
      const res = await client.getTicker('btc_jpy');
      expect(res.success).toBe(1);
      expect(res.data).toHaveProperty('sell');
      expect(res.data).toHaveProperty('buy');
      expect(res.data).toHaveProperty('last');
      expect(res.data).toHaveProperty('timestamp');
    });
  });

  describe('getTickers', () => {
    it('should return all tickers', async () => {
      const res = await client.getTickers();
      expect(res.success).toBe(1);
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data.length).toBeGreaterThan(0);
      expect(res.data[0]).toHaveProperty('pair');
    });
  });

  describe('getTickersJpy', () => {
    it('should return JPY tickers', async () => {
      const res = await client.getTickersJpy();
      expect(res.success).toBe(1);
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe('getDepth', () => {
    it('should return depth data for btc_jpy', async () => {
      const res = await client.getDepth('btc_jpy');
      expect(res.success).toBe(1);
      expect(res.data).toHaveProperty('asks');
      expect(res.data).toHaveProperty('bids');
      expect(Array.isArray(res.data.asks)).toBe(true);
    });
  });

  describe('getTransactions', () => {
    it('should return recent transactions for btc_jpy', async () => {
      const res = await client.getTransactions('btc_jpy');
      expect(res.success).toBe(1);
      expect(res.data).toHaveProperty('transactions');
      expect(Array.isArray(res.data.transactions)).toBe(true);
    });
  });

  describe('getCandlestick', () => {
    it('should return candlestick data for btc_jpy', async () => {
      const res = await client.getCandlestick('btc_jpy', '1day', '2024');
      expect(res.success).toBe(1);
      expect(res.data).toHaveProperty('candlestick');
    });
  });

  describe('getCircuitBreakInfo', () => {
    it('should return circuit break info for btc_jpy', async () => {
      const res = await client.getCircuitBreakInfo('btc_jpy');
      expect(res.success).toBe(1);
      expect(res.data).toHaveProperty('mode');
      expect(res.data).toHaveProperty('fee_type');
    });
  });
});
