import { CircuitBreakMode, CandleType, FeeType, PairString } from '../shared';

export interface TickerData {
  sell: string;
  buy: string;
  high: string;
  low: string;
  open: string;
  last: string;
  vol: string;
  timestamp: number;
}

export interface TickerWithPair extends TickerData {
  pair: PairString;
}

export interface DepthData {
  asks: [string, string][];
  bids: [string, string][];
  asks_over: string;
  bids_under: string;
  asks_under: string;
  bids_over: string;
  ask_market: string;
  bid_market: string;
  timestamp: number;
  sequenceId: string;
}

export interface TransactionItem {
  transaction_id: number;
  side: 'buy' | 'sell';
  price: string;
  amount: string;
  executed_at: number;
}

export interface TransactionsData {
  transactions: TransactionItem[];
}

export interface CandlestickItem {
  type: CandleType;
  ohlcv: [string, string, string, string, string, number][];
  timestamp: number;
}

export interface CandlestickData {
  candlestick: CandlestickItem[];
}

export interface CircuitBreakInfoData {
  mode: CircuitBreakMode;
  estimated_itayose_price: string | null;
  estimated_itayose_amount: string | null;
  itayose_upper_price: string | null;
  itayose_lower_price: string | null;
  upper_trigger_price: string | null;
  lower_trigger_price: string | null;
  fee_type: FeeType;
  reopen_timestamp: number | null;
  timestamp: number;
}
