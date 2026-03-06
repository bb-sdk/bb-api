import {
  CANDLE_TYPE,
  CIRCUIT_BREAK_MODE,
  DEPOSIT_STATUS,
  FEE_TYPE,
  ORDER_SIDE,
  ORDER_STATUS,
  ORDER_TYPE,
  PAIR,
  POSITION_SIDE,
  WITHDRAWAL_STATUS,
} from '../constants/enum';

export interface BitbankApiResponse<T> {
  success: 0 | 1;
  data: T;
}

// Known pairs provide IDE autocomplete; `string & {}` allows arbitrary pairs without collapsing the union.
export type PairString = (typeof PAIR)[keyof typeof PAIR] | (string & {});
export type OrderType = (typeof ORDER_TYPE)[keyof typeof ORDER_TYPE];
export type OrderSide = (typeof ORDER_SIDE)[keyof typeof ORDER_SIDE];
export type PositionSide = (typeof POSITION_SIDE)[keyof typeof POSITION_SIDE];
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type CandleType = (typeof CANDLE_TYPE)[keyof typeof CANDLE_TYPE];
export type CircuitBreakMode = (typeof CIRCUIT_BREAK_MODE)[keyof typeof CIRCUIT_BREAK_MODE];
export type FeeType = (typeof FEE_TYPE)[keyof typeof FEE_TYPE];
export type WithdrawalStatus = (typeof WITHDRAWAL_STATUS)[keyof typeof WITHDRAWAL_STATUS];
export type DepositStatus = (typeof DEPOSIT_STATUS)[keyof typeof DEPOSIT_STATUS];

/** Common order fields shared between REST and Stream responses */
export interface OrderFields {
  order_id: number;
  pair: PairString;
  side: OrderSide;
  position_side?: PositionSide;
  type: OrderType;
  start_amount: string | null;
  remaining_amount: string | null;
  executed_amount: string;
  price?: string;
  post_only?: boolean;
  user_cancelable: boolean;
  average_price: string;
  ordered_at: number;
  expire_at: number | null;
  triggered_at?: number;
  trigger_price?: string;
  status: OrderStatus;
}
