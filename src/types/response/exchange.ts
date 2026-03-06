import { PairString } from '../shared';

export interface ExchangeStatus {
  pair: PairString;
  status: 'NORMAL' | 'BUSY' | 'VERY_BUSY' | 'HALT';
  min_amount: string;
}

export interface ExchangeStatusResponse {
  statuses: ExchangeStatus[];
}

export interface PairInfo {
  name: string;
  base_asset: string;
  quote_asset: string;
  maker_fee_rate_base: string;
  taker_fee_rate_base: string;
  maker_fee_rate_quote: string;
  taker_fee_rate_quote: string;
  margin_open_maker_fee_rate_quote: string | null;
  margin_open_taker_fee_rate_quote: string | null;
  margin_close_maker_fee_rate_quote: string | null;
  margin_close_taker_fee_rate_quote: string | null;
  margin_long_interest: string | null;
  margin_short_interest: string | null;
  margin_current_individual_ratio: string | null;
  margin_current_individual_until: number | null;
  margin_current_company_ratio: string | null;
  margin_current_company_until: number | null;
  margin_next_individual_ratio: string | null;
  margin_next_individual_until: number | null;
  margin_next_company_ratio: string | null;
  margin_next_company_until: number | null;
  unit_amount: string;
  limit_max_amount: string;
  market_max_amount: string;
  market_allowance_rate: string;
  price_digits: number;
  amount_digits: number;
  is_enabled: boolean;
  stop_order: boolean;
  stop_order_and_cancel: boolean;
  stop_market_order: boolean;
  stop_stop_order: boolean;
  stop_stop_limit_order: boolean;
  stop_margin_long_order: boolean;
  stop_margin_short_order: boolean;
  stop_buy_order: boolean;
  stop_sell_order: boolean;
}

export interface AllPairsInfoResponse {
  pairs: PairInfo[];
}

export interface PrivateStreamSubscribeResponse {
  pubnub_channel: string;
  pubnub_token: string;
}
