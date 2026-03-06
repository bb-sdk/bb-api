import { OrderFields, OrderSide, OrderType, PairString, PositionSide } from '../shared';

export interface OrderResponse extends OrderFields {
  canceled_at?: number;
}

export interface OrdersResponse {
  orders: OrderResponse[];
}

export interface TradeHistoryItem {
  trade_id: number;
  pair: PairString;
  order_id: number;
  side: OrderSide;
  position_side?: PositionSide;
  type: OrderType;
  amount: string;
  price: string;
  maker_taker: 'maker' | 'taker';
  fee_amount_base: string;
  fee_amount_quote: string;
  fee_occurred_amount_quote: string;
  profit_loss?: string;
  interest?: string;
  executed_at: number;
}

export interface TradeHistoryResponse {
  trades: TradeHistoryItem[];
}
