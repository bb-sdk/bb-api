import { OrderSide, OrderType, PairString, PositionSide } from '../shared';

export interface SubmitOrderRequest {
  pair: PairString;
  amount?: string;
  price?: string;
  side: OrderSide;
  position_side?: PositionSide;
  type: OrderType;
  post_only?: boolean;
  trigger_price?: string;
}

export interface GetOrderRequest {
  pair: PairString;
  order_id: number;
}

export interface CancelOrderRequest {
  pair: PairString;
  order_id: number;
}

export interface CancelOrdersRequest {
  pair: PairString;
  order_ids: number[];
}

export interface GetOrdersInfoRequest {
  pair: PairString;
  order_ids: number[];
}

export interface GetActiveOrdersRequest {
  pair?: PairString;
  count?: number;
  from_id?: number;
  end_id?: number;
  since?: number;
  end?: number;
}

export interface GetTradeHistoryRequest {
  pair?: PairString;
  count?: number;
  order_id?: number;
  since?: number;
  end?: number;
  order?: 'asc' | 'desc';
}
