import { EventEmitter } from 'events';
import PubNub from 'pubnub';

import { RestClient } from './rest-client';
import {
  AssetUpdateParams,
  DepositParams,
  DealerOrderNewParams,
  MarginNoticeUpdateParams,
  MarginPayableUpdateParams,
  MarginPositionUpdateParams,
  PrivateStreamMessage,
  SpotOrderInvalidationParams,
  SpotOrderParams,
  SpotTradeParams,
  WithdrawalParams,
} from './types/websockets/private-stream';
import { logError, logInfo } from './util/logger';

const PUBNUB_SUBSCRIBE_KEY = 'sub-c-ecebae8e-dd60-11e6-b6b1-02ee2ddab7fe';

export interface PrivateStreamClientOptions {
  restClient: RestClient;
}

export declare interface PrivateStreamClient {
  on(event: 'asset_update', listener: (params: AssetUpdateParams[]) => void): this;
  on(event: 'spot_order_new', listener: (params: SpotOrderParams[]) => void): this;
  on(event: 'spot_order', listener: (params: SpotOrderParams[]) => void): this;
  on(
    event: 'spot_order_invalidation',
    listener: (params: SpotOrderInvalidationParams) => void,
  ): this;
  on(event: 'spot_trade', listener: (params: SpotTradeParams[]) => void): this;
  on(event: 'dealer_order_new', listener: (params: DealerOrderNewParams[]) => void): this;
  on(event: 'withdrawal', listener: (params: WithdrawalParams[]) => void): this;
  on(event: 'deposit', listener: (params: DepositParams[]) => void): this;
  on(
    event: 'margin_position_update',
    listener: (params: MarginPositionUpdateParams[]) => void,
  ): this;
  on(
    event: 'margin_payable_update',
    listener: (params: MarginPayableUpdateParams[]) => void,
  ): this;
  on(
    event: 'margin_notice_update',
    listener: (params: MarginNoticeUpdateParams[]) => void,
  ): this;
  on(event: 'connect', listener: () => void): this;
  on(event: 'disconnect', listener: (reason: string) => void): this;
  on(event: 'error', listener: (error: Error) => void): this;
}

export class PrivateStreamClient extends EventEmitter {
  private restClient: RestClient;
  private pubnub: PubNub | null = null;
  private channel: string | null = null;
  private isReconnecting = false;

  constructor(options: PrivateStreamClientOptions) {
    super();
    this.restClient = options.restClient;
  }

  async connect(): Promise<void> {
    const { channel, token } = await this.fetchChannelAndToken();
    this.channel = channel;
    this.setupPubNub(channel, token);
  }

  private async fetchChannelAndToken(): Promise<{ channel: string; token: string }> {
    const res = await this.restClient.getPrivateStreamSubscribeInfo();
    if (res.success !== 1) {
      throw new Error(`Failed to get private stream subscribe info: ${JSON.stringify(res)}`);
    }
    return {
      channel: res.data.pubnub_channel,
      token: res.data.pubnub_token,
    };
  }

  private setupPubNub(channel: string, token: string): void {
    if (this.pubnub) {
      this.pubnub.removeAllListeners();
      this.pubnub.unsubscribeAll();
    }

    this.pubnub = new PubNub({
      subscribeKey: PUBNUB_SUBSCRIBE_KEY,
      userId: channel,
      ssl: true,
    });

    this.pubnub.addListener({
      status: async (status) => {
        switch (status.category) {
          case 'PNConnectedCategory': {
            logInfo('PrivateStreamClient connected');
            this.emit('connect');
            break;
          }

          case 'PNNetworkUpCategory':
          case 'PNReconnectedCategory': {
            logInfo('PrivateStreamClient connection restored');
            if (this.channel) {
              this.subscribeChannel(this.channel, token);
            }
            break;
          }

          case 'PNAccessDeniedCategory': {
            logError('PrivateStreamClient access denied, reconnecting with new token');
            if (!this.isReconnecting) {
              await this.reconnect();
            }
            break;
          }

          case 'PNTimeoutCategory':
          case 'PNNetworkDownCategory':
          case 'PNNetworkIssuesCategory': {
            logError('PrivateStreamClient network error', status);
            if (!this.isReconnecting) {
              await this.reconnect();
            }
            break;
          }

          default: {
            logInfo('PrivateStreamClient status', status.category);
          }
        }
      },

      message: (data: PubNub.Subscription.Message) => {
        const message = data.message as unknown as PrivateStreamMessage | undefined;
        if (!message?.method) return;

        logInfo('PrivateStreamClient message', message.method);

        this.emit(message.method, message.params);
      },
    });

    this.subscribeChannel(channel, token);
  }

  private subscribeChannel(channel: string, token: string): void {
    if (!this.pubnub) return;
    this.pubnub.setToken(token);
    this.pubnub.subscribe({ channels: [channel] });
  }

  private async reconnect(): Promise<void> {
    if (this.isReconnecting) return;
    this.isReconnecting = true;
    try {
      const { channel, token } = await this.fetchChannelAndToken();
      this.channel = channel;
      this.setupPubNub(channel, token);
    } catch (e) {
      logError('PrivateStreamClient reconnect failed', e);
      this.emit('error', e instanceof Error ? e : new Error(String(e)));
    } finally {
      this.isReconnecting = false;
    }
  }

  disconnect(): void {
    if (this.pubnub) {
      this.pubnub.removeAllListeners();
      this.pubnub.unsubscribeAll();
      this.pubnub = null;
    }
    this.channel = null;
  }
}
