import { DepositStatus } from '../shared';

export interface DepositHistoryItem {
  uuid: string;
  asset: string;
  network: string;
  amount: string;
  txid: string | null;
  status: DepositStatus;
  found_at: number;
  confirmed_at?: number;
}

export interface DepositHistoryResponse {
  deposits: DepositHistoryItem[];
}

export interface UnconfirmedDepositItem {
  uuid: string;
  asset: string;
  amount: string;
  network: string;
  txid: string;
  created_at: number;
}

export interface UnconfirmedDepositsResponse {
  deposits: UnconfirmedDepositItem[];
}

export interface DepositOriginator {
  uuid: string;
  label: string;
  deposit_type: string;
  deposit_purpose: string | null;
  originator_status: string;
  originator_type: string;
  originator_last_name: string | null;
  originator_first_name: string | null;
  originator_country: string | null;
  originator_preference: string | null;
  originator_city: string | null;
  originator_address: string | null;
  originator_building: string | null;
  originator_company_name: string | null;
  originator_company_type: string | null;
  originator_company_type_position: string | null;
  originator_substantial_controllers?: Array<{
    uuid: string;
    name: string;
    country: string;
    prefecture: string | null;
  }>;
}

export interface DepositOriginatorsResponse {
  originators: DepositOriginator[];
}
