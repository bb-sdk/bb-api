export type WithdrawalFee =
  | { min: string; max: string }
  | { under: string; over: string; threshold: string };

export interface NetworkInfo {
  asset: string;
  network: string;
  stop_deposit: boolean;
  stop_withdrawal: boolean;
  withdrawal_fee: string;
}

export interface AssetItem {
  asset: string;
  free_amount: string;
  amount_precision: number;
  onhand_amount: string;
  locked_amount: string;
  withdrawing_amount: string;
  withdrawal_fee: WithdrawalFee;
  stop_deposit: boolean;
  stop_withdrawal: boolean;
  network_list?: NetworkInfo[];
  collateral_ratio: string;
}

export interface AssetsResponse {
  assets: AssetItem[];
}
