import { EventEmitter } from 'events';
import { io, Socket } from 'socket.io-client';

import { PairString } from './types/shared';
import {
  WsCircuitBreakInfoData,
  WsDepthDiffData,
  WsDepthWholeData,
  WsRoomMessage,
  WsTickerData,
  WsTransactionsData,
} from './types/websockets/public-stream';
import { logError, logInfo } from './util/logger';

const PUBLIC_STREAM_URL = 'wss://stream.bitbank.cc';

export declare interface PublicStreamClient {
  on(event: 'ticker', listener: (roomName: string, data: WsTickerData) => void): this;
  on(
    event: 'transactions',
    listener: (roomName: string, data: WsTransactionsData) => void,
  ): this;
  on(
    event: 'depth_diff',
    listener: (roomName: string, data: WsDepthDiffData) => void,
  ): this;
  on(
    event: 'depth_whole',
    listener: (roomName: string, data: WsDepthWholeData) => void,
  ): this;
  on(
    event: 'circuit_break_info',
    listener: (roomName: string, data: WsCircuitBreakInfoData) => void,
  ): this;
  on(event: 'connect', listener: () => void): this;
  on(event: 'disconnect', listener: (reason: string) => void): this;
  on(event: 'error', listener: (error: Error) => void): this;
}

export class PublicStreamClient extends EventEmitter {
  private socket: Socket;

  constructor(url: string = PUBLIC_STREAM_URL) {
    super();

    this.socket = io(url, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      logInfo('PublicStreamClient connected');
      this.emit('connect');
    });

    this.socket.on('disconnect', (reason: string) => {
      logInfo('PublicStreamClient disconnected', reason);
      this.emit('disconnect', reason);
    });

    this.socket.on('error', (error: Error) => {
      logError('PublicStreamClient error', error);
      this.emit('error', error);
    });

    this.socket.on('message', (msg: WsRoomMessage<unknown>) => {
      if (!msg || !msg.room_name) return;

      const roomName = msg.room_name;
      const data = msg.message?.data;

      if (roomName.startsWith('ticker_')) {
        this.emit('ticker', roomName, data as WsTickerData);
      } else if (roomName.startsWith('transactions_')) {
        this.emit('transactions', roomName, data as WsTransactionsData);
      } else if (roomName.startsWith('depth_diff_')) {
        this.emit('depth_diff', roomName, data as WsDepthDiffData);
      } else if (roomName.startsWith('depth_whole_')) {
        this.emit('depth_whole', roomName, data as WsDepthWholeData);
      } else if (roomName.startsWith('circuit_break_info_')) {
        this.emit('circuit_break_info', roomName, data as WsCircuitBreakInfoData);
      }
    });
  }

  private joinRoom(roomName: string): void {
    this.socket.emit('join-room', roomName);
  }

  private leaveRoom(roomName: string): void {
    this.socket.emit('leave-room', roomName);
  }

  subscribeTicker(pair: PairString): void {
    this.joinRoom(`ticker_${pair}`);
  }

  unsubscribeTicker(pair: PairString): void {
    this.leaveRoom(`ticker_${pair}`);
  }

  subscribeTransactions(pair: PairString): void {
    this.joinRoom(`transactions_${pair}`);
  }

  unsubscribeTransactions(pair: PairString): void {
    this.leaveRoom(`transactions_${pair}`);
  }

  subscribeDepthDiff(pair: PairString): void {
    this.joinRoom(`depth_diff_${pair}`);
  }

  unsubscribeDepthDiff(pair: PairString): void {
    this.leaveRoom(`depth_diff_${pair}`);
  }

  subscribeDepthWhole(pair: PairString): void {
    this.joinRoom(`depth_whole_${pair}`);
  }

  unsubscribeDepthWhole(pair: PairString): void {
    this.leaveRoom(`depth_whole_${pair}`);
  }

  subscribeCircuitBreakInfo(pair: PairString): void {
    this.joinRoom(`circuit_break_info_${pair}`);
  }

  unsubscribeCircuitBreakInfo(pair: PairString): void {
    this.leaveRoom(`circuit_break_info_${pair}`);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
