import { PairString, PositionSide } from '../shared';

export interface AvailableBalance {
  pair: PairString;
  long: string;
  short: string;
}

export interface MarginStatusResponse {
  status: string;
  total_margin_balance_percentage: string | null;
  total_margin_balance: string;
  margin_position_profit_loss: string;
  unrealized_cost: string;
  total_margin_position_product: string;
  open_margin_position_product: string;
  open_margin_order_product: string;
  total_position_maintenance_margin: string;
  total_long_position_maintenance_margin: string;
  total_short_position_maintenance_margin: string;
  total_open_order_maintenance_margin: string;
  total_long_open_order_maintenance_margin: string;
  total_short_open_order_maintenance_margin: string;
  margin_call_percentage: string | null;
  losscut_percentage: string | null;
  buy_credit: string;
  sell_credit: string;
  available_balances: AvailableBalance[];
}

export interface MarginPosition {
  pair: PairString;
  position_side: PositionSide;
  open_amount: string;
  product: string;
  average_price: string;
  unrealized_fee_amount: string;
  unrealized_interest_amount: string;
}

export interface MarginNotice {
  what: string | null;
  occurred_at: number | null;
  amount: string | null;
  due_date_at: number | null;
}

export interface MarginPositionsResponse {
  notice: MarginNotice;
  payables: { amount: string };
  positions: MarginPosition[];
  losscut_threshold: { individual: string; company: string };
}
