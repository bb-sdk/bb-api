import { AxiosRequestConfig } from 'axios';

import {
  BitbankApiResponse,
  CandleType,
  PairString,
} from './types/shared';
import {
  CandlestickData,
  CircuitBreakInfoData,
  DepthData,
  TickerData,
  TickerWithPair,
  TransactionsData,
} from './types/response/public';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';

const PUBLIC_BASE_URL = 'https://public.bitbank.cc';

export class PublicRestClient extends BaseRestClient {
  constructor(
    restOptions: RestClientOptions = {},
    networkOptions: AxiosRequestConfig = {},
  ) {
    super(PUBLIC_BASE_URL, restOptions, networkOptions);
  }

  getTicker(pair: PairString): Promise<BitbankApiResponse<TickerData>> {
    return this.get(`/${pair}/ticker`);
  }

  getTickers(): Promise<BitbankApiResponse<TickerWithPair[]>> {
    return this.get('/tickers');
  }

  getTickersJpy(): Promise<BitbankApiResponse<TickerWithPair[]>> {
    return this.get('/tickers_jpy');
  }

  getDepth(pair: PairString): Promise<BitbankApiResponse<DepthData>> {
    return this.get(`/${pair}/depth`);
  }

  getTransactions(
    pair: PairString,
    date?: string,
  ): Promise<BitbankApiResponse<TransactionsData>> {
    if (date) {
      return this.get(`/${pair}/transactions/${date}`);
    }
    return this.get(`/${pair}/transactions`);
  }

  getCandlestick(
    pair: PairString,
    type: CandleType,
    date: string,
  ): Promise<BitbankApiResponse<CandlestickData>> {
    return this.get(`/${pair}/candlestick/${type}/${date}`);
  }

  getCircuitBreakInfo(
    pair: PairString,
  ): Promise<BitbankApiResponse<CircuitBreakInfoData>> {
    return this.get(`/${pair}/circuit_break_info`);
  }
}
