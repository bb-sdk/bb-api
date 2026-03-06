import { CircuitBreakMode, FeeType } from '../shared';

export interface WsTickerData {
  sell: string;
  buy: string;
  high: string;
  low: string;
  open: string;
  last: string;
  vol: string;
  timestamp: number;
}

export interface WsTransactionItem {
  transaction_id: number;
  side: 'buy' | 'sell';
  price: string;
  amount: string;
  executed_at: number;
}

export interface WsTransactionsData {
  transactions: WsTransactionItem[];
}

export interface WsDepthDiffData {
  a: [string, string][];   // asks: 売り板の差分 [price, amount][]
  b: [string, string][];   // bids: 買い板の差分 [price, amount][]
  ao?: string;             // asks_over: 上限を超えた売り注文の合計
  bu?: string;             // bids_under: 下限を下回った買い注文の合計
  au?: string;             // asks_under: 下限を下回った売り注文の合計
  bo?: string;             // bids_over: 上限を超えた買い注文の合計
  am?: string;             // ask_market: 売り成行注文の合計
  bm?: string;             // bid_market: 買い成行注文の合計
  t: number;               // timestamp
  s: string;               // sequenceId
}

export interface WsDepthWholeData {
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

export interface WsCircuitBreakInfoData {
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

export interface WsRoomMessage<T> {
  room_name: string;
  message: {
    pid?: number;
    data: T;
  };
}
