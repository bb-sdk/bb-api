import { AxiosRequestConfig } from 'axios';

import { BitbankApiResponse } from './types/shared';
import { AssetsResponse } from './types/response/asset';
import { MarginPositionsResponse, MarginStatusResponse } from './types/response/margin';
import { OrderResponse, OrdersResponse, TradeHistoryResponse } from './types/response/order';
import {
  DepositHistoryResponse,
  DepositOriginatorsResponse,
  UnconfirmedDepositsResponse,
} from './types/response/deposit';
import {
  WithdrawalAccountsResponse,
  WithdrawalHistoryResponse,
  WithdrawalResponse,
} from './types/response/withdrawal';
import {
  AllPairsInfoResponse,
  ExchangeStatusResponse,
  PrivateStreamSubscribeResponse,
} from './types/response/exchange';
import {
  CancelOrderRequest,
  CancelOrdersRequest,
  GetActiveOrdersRequest,
  GetOrderRequest,
  GetOrdersInfoRequest,
  GetTradeHistoryRequest,
  SubmitOrderRequest,
} from './types/request/order';
import {
  ConfirmAllDepositsRequest,
  ConfirmDepositsRequest,
  GetDepositHistoryRequest,
} from './types/request/deposit';
import {
  GetWithdrawalAccountRequest,
  GetWithdrawalHistoryRequest,
  RequestWithdrawalRequest,
} from './types/request/withdrawal';
import BaseRestClient from './util/BaseRestClient';
import { RestClientOptions } from './util/requestUtils';

const PRIVATE_BASE_URL = 'https://api.bitbank.cc/v1';

export class RestClient extends BaseRestClient {
  constructor(
    restOptions: RestClientOptions = {},
    networkOptions: AxiosRequestConfig = {},
  ) {
    super(PRIVATE_BASE_URL, restOptions, networkOptions);
  }

  protected getSignPath(endpoint: string): string {
    // Private API signing requires /v1 prefix in the path
    return `/v1${endpoint}`;
  }

  // Assets
  getAssets(): Promise<BitbankApiResponse<AssetsResponse>> {
    return this.getPrivate('/user/assets');
  }

  // Orders
  getOrder(params: GetOrderRequest): Promise<BitbankApiResponse<OrderResponse>> {
    return this.getPrivate('/user/spot/order', params);
  }

  submitOrder(params: SubmitOrderRequest): Promise<BitbankApiResponse<OrderResponse>> {
    return this.postPrivate('/user/spot/order', params);
  }

  cancelOrder(params: CancelOrderRequest): Promise<BitbankApiResponse<OrderResponse>> {
    return this.postPrivate('/user/spot/cancel_order', params);
  }

  cancelOrders(params: CancelOrdersRequest): Promise<BitbankApiResponse<OrdersResponse>> {
    return this.postPrivate('/user/spot/cancel_orders', params);
  }

  getOrdersInfo(params: GetOrdersInfoRequest): Promise<BitbankApiResponse<OrdersResponse>> {
    return this.postPrivate('/user/spot/orders_info', params);
  }

  getActiveOrders(
    params?: GetActiveOrdersRequest,
  ): Promise<BitbankApiResponse<OrdersResponse>> {
    return this.getPrivate('/user/spot/active_orders', params);
  }

  // Margin
  getMarginStatus(): Promise<BitbankApiResponse<MarginStatusResponse>> {
    return this.getPrivate('/user/margin/status');
  }

  getMarginPositions(): Promise<BitbankApiResponse<MarginPositionsResponse>> {
    return this.getPrivate('/user/margin/positions');
  }

  // Trade history
  getTradeHistory(
    params?: GetTradeHistoryRequest,
  ): Promise<BitbankApiResponse<TradeHistoryResponse>> {
    return this.getPrivate('/user/spot/trade_history', params);
  }

  // Deposits
  getDepositHistory(
    params?: GetDepositHistoryRequest,
  ): Promise<BitbankApiResponse<DepositHistoryResponse>> {
    return this.getPrivate('/user/deposit_history', params);
  }

  getUnconfirmedDeposits(): Promise<BitbankApiResponse<UnconfirmedDepositsResponse>> {
    return this.getPrivate('/user/unconfirmed_deposits');
  }

  getDepositOriginators(): Promise<BitbankApiResponse<DepositOriginatorsResponse>> {
    return this.getPrivate('/user/deposit_originators');
  }

  confirmDeposits(
    params: ConfirmDepositsRequest,
  ): Promise<BitbankApiResponse<Record<string, never>>> {
    return this.postPrivate('/user/confirm_deposits', params);
  }

  confirmAllDeposits(
    params: ConfirmAllDepositsRequest,
  ): Promise<BitbankApiResponse<Record<string, never>>> {
    return this.postPrivate('/user/confirm_deposits_all', params);
  }

  // Withdrawals
  getWithdrawalAccount(
    params: GetWithdrawalAccountRequest,
  ): Promise<BitbankApiResponse<WithdrawalAccountsResponse>> {
    return this.getPrivate('/user/withdrawal_account', params);
  }

  requestWithdrawal(
    params: RequestWithdrawalRequest,
  ): Promise<BitbankApiResponse<WithdrawalResponse>> {
    return this.postPrivate('/user/request_withdrawal', params);
  }

  getWithdrawalHistory(
    params?: GetWithdrawalHistoryRequest,
  ): Promise<BitbankApiResponse<WithdrawalHistoryResponse>> {
    return this.getPrivate('/user/withdrawal_history', params);
  }

  // Exchange status (no auth required, but hosted on api.bitbank.cc so kept in RestClient)
  getExchangeStatus(): Promise<BitbankApiResponse<ExchangeStatusResponse>> {
    return this.get('/spot/status');
  }

  getAllPairsInfo(): Promise<BitbankApiResponse<AllPairsInfoResponse>> {
    return this.get('/spot/pairs');
  }

  // Private stream
  getPrivateStreamSubscribeInfo(): Promise<
    BitbankApiResponse<PrivateStreamSubscribeResponse>
  > {
    return this.getPrivate('/user/subscribe');
  }
}
