import { WithdrawalStatus } from '../shared';

export interface WithdrawalAccount {
  uuid: string;
  label: string;
  network: string;
  address: string;
}

export interface WithdrawalAccountsResponse {
  accounts: WithdrawalAccount[];
}

export interface WithdrawalItem {
  uuid: string;
  asset: string;
  account_uuid: string;
  amount: string;
  fee: string;
  label?: string;
  address?: string;
  network?: string;
  txid?: string | null;
  destination_tag?: number | string;
  bank_name?: string;
  branch_name?: string;
  account_type?: string;
  account_number?: string;
  account_owner?: string;
  status: WithdrawalStatus;
  requested_at: number;
}

export type WithdrawalResponse = WithdrawalItem;

export interface WithdrawalHistoryResponse {
  withdrawals: WithdrawalItem[];
}
