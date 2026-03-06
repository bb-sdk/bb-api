export interface GetWithdrawalAccountRequest {
  asset: string;
}

export interface RequestWithdrawalRequest {
  asset: string;
  uuid: string;
  amount: string;
  otp_token?: string;
  sms_token?: string;
}

export interface GetWithdrawalHistoryRequest {
  asset?: string;
  count?: number;
  since?: number;
  end?: number;
}
