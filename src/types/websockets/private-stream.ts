import {
  DepositStatus,
  OrderSide,
  OrderStatus,
  OrderType,
  PairString,
  PositionSide,
  WithdrawalStatus,
} from '../shared';

export interface AssetUpdateParams {
  asset: string;
  amountPrecision: number;
  freeAmount: string;
  lockedAmount: string;
  onhandAmount: string;
  withdrawingAmount: string;
}

export interface SpotOrderParams {
  average_price: string;
  canceled_at?: number;
  executed_amount: string;
  executed_at: number;
  order_id: number;
  ordered_at: number;
  pair: PairString;
  price?: string;
  trigger_price?: string;
  remaining_amount: string;
  position_side?: PositionSide;
  side: OrderSide;
  start_amount: string;
  status: OrderStatus;
  type: OrderType;
  expire_at: number | null;
  triggered_at?: number;
  post_only?: boolean;
  user_cancelable: boolean;
  is_just_triggered: boolean;
}

export interface SpotOrderInvalidationParams {
  order_id: number[];
}

export interface SpotTradeParams {
  amount: string;
  executed_at: number;
  fee_amount_base: string;
  fee_amount_quote: string;
  fee_occurred_amount_quote: string;
  maker_taker: 'maker' | 'taker';
  order_id: number;
  pair: PairString;
  price: string;
  position_side: PositionSide | null;
  side: OrderSide;
  trade_id: number;
  type: OrderType;
  profit_loss: string | null;
  interest: string | null;
}

export interface DealerOrderNewParams {
  order_id: number;
  asset: string;
  side: OrderSide;
  price: string;
  amount: string;
  ordered_at: number;
}

export interface WithdrawalParams {
  uuid: string;
  asset: string;
  account_uuid: string;
  amount: string;
  fee: string;
  bank_name?: string;
  branch_name?: string;
  account_type?: string;
  account_number?: string;
  account_owner?: string;
  status: WithdrawalStatus;
  requested_at: number;
}

export interface DepositParams {
  uuid: string;
  asset: string;
  amount: string;
  network?: string;
  address?: string;
  txid?: string;
  found_at: number;
  confirmed_at?: number;
  status: DepositStatus;
}

export interface MarginPositionUpdateParams {
  pair: PairString;
  position_side: PositionSide;
  average_price: string;
  open_amount: string;
  locked_amount: string;
  product: string;
  unrealized_fee_amount: string;
  unrealized_interest_amount: string;
}

export interface MarginPayableUpdateParams {
  amount: string;
}

export interface MarginNoticeUpdateParams {
  what: string | null;
  occurred_at: number | null;
  amount: string | null;
  due_date_at: number | null;
}

export type PrivateStreamMessage =
  | { method: 'asset_update'; params: AssetUpdateParams[] }
  | { method: 'spot_order_new'; params: SpotOrderParams[] }
  | { method: 'spot_order'; params: SpotOrderParams[] }
  | { method: 'spot_order_invalidation'; params: SpotOrderInvalidationParams }
  | { method: 'spot_trade'; params: SpotTradeParams[] }
  | { method: 'dealer_order_new'; params: DealerOrderNewParams[] }
  | { method: 'withdrawal'; params: WithdrawalParams[] }
  | { method: 'deposit'; params: DepositParams[] }
  | { method: 'margin_position_update'; params: MarginPositionUpdateParams[] }
  | { method: 'margin_payable_update'; params: MarginPayableUpdateParams[] }
  | { method: 'margin_notice_update'; params: MarginNoticeUpdateParams[] };
