export interface GetDepositHistoryRequest {
  asset?: string;
  count?: number;
  since?: number;
  end?: number;
}

export interface ConfirmDepositsRequest {
  deposits: Array<{
    uuid: string;
    originator_uuid: string;
  }>;
}

export interface ConfirmAllDepositsRequest {
  originator_uuid: string;
}
