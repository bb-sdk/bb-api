# bitbank-api

> TypeScript client library for [bitbank.cc](https://bitbank.cc) — REST API, public WebSocket, and private stream, all type-safe.

[![npm](https://img.shields.io/npm/v/@pokooo/bb-api)](https://www.npmjs.com/package/@pokooo/bb-api)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![pnpm](https://img.shields.io/badge/packageManager-pnpm-orange)](https://pnpm.io)

---

## Clients

| Client | Auth | Description |
|--------|------|-------------|
| `RestClient` | Required | Assets, orders (get/submit/cancel), margin, deposit history, withdrawals, exchange status, private stream token |
| `PublicRestClient` | None | Ticker, depth, transactions, candlestick, circuit breaker info |
| `PublicStreamClient` | None | Public WebSocket (Socket.IO) — subscribe/unsubscribe to ticker, transactions, depth diff/whole, circuit breaker info |
| `PrivateStreamClient` | `RestClient` | Private stream (PubNub) — real-time events for assets, orders, trades, deposits, withdrawals, margin |

> `PrivateStreamClient` requires an authenticated `RestClient` instance.

---

## Installation

```bash
pnpm add @pokooo/bb-api
# npm install @pokooo/bb-api
# yarn add @pokooo/bb-api
```

**Requirements:** Node.js (uses Web Crypto API for signing).

---

## Quick Start

### Public REST (no auth)

```typescript
import { PublicRestClient, PAIR } from '@pokooo/bb-api';

const client = new PublicRestClient();

const ticker = await client.getTicker(PAIR.BTC_JPY);
const depth  = await client.getDepth(PAIR.BTC_JPY);
const tickers = await client.getTickersJpy();
```

### Authenticated REST

```typescript
import { RestClient, PAIR, ORDER_TYPE, ORDER_SIDE } from '@pokooo/bb-api';

const client = new RestClient({
  key: process.env.BITBANK_API_KEY!,
  secret: process.env.BITBANK_API_SECRET!,
});

const assets       = await client.getAssets();
const activeOrders = await client.getActiveOrders({ pair: PAIR.BTC_JPY });

const order = await client.submitOrder({
  pair:   PAIR.BTC_JPY,
  amount: '0.001',
  side:   ORDER_SIDE.BUY,
  type:   ORDER_TYPE.MARKET,
});
```

### Public WebSocket

```typescript
import { PublicStreamClient, PAIR } from '@pokooo/bb-api';

const stream = new PublicStreamClient();

stream.on('connect', () => {
  stream.subscribeTicker(PAIR.BTC_JPY);
  stream.subscribeTransactions(PAIR.BTC_JPY);
});

stream.on('ticker',       (roomName, data) => console.log(roomName, data));
stream.on('transactions', (roomName, data) => console.log(roomName, data));

// stream.disconnect();
```

### Private Stream

```typescript
import { RestClient, PrivateStreamClient } from '@pokooo/bb-api';

const restClient = new RestClient({
  key:    process.env.BITBANK_API_KEY!,
  secret: process.env.BITBANK_API_SECRET!,
});

const stream = new PrivateStreamClient({ restClient });

stream.on('asset_update', (params) => console.log('asset_update', params));
stream.on('spot_order',   (params) => console.log('spot_order',   params));

await stream.connect();

// stream.disconnect();
```

---

## Authentication Options (`RestClient`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `key` | `string` | — | API key |
| `secret` | `string` | — | API secret |
| `authMethod` | `'time-window' \| 'nonce'` | `'time-window'` | Signing method (`'nonce'` is legacy) |
| `timeWindow` | `number` | `5000` | Time window in ms (time-window mode) |
| `throwExceptions` | `boolean` | `false` | Throw on failed REST responses |
| `strict_param_validation` | `boolean` | `false` | Error on unknown params before signing |
| `customSignMessageFn` | `(msg, secret) => Promise<string>` | — | Custom signing function (for non-Web Crypto environments) |

> Never hardcode API keys in source code — use environment variables.

---

## Types & Constants

```typescript
import type { BitbankApiResponse, PairString } from '@pokooo/bb-api';
import { PAIR, ORDER_TYPE, ORDER_SIDE, CANDLE_TYPE } from '@pokooo/bb-api';
```

**Types:** `BitbankApiResponse<T>`, `PairString`, `OrderFields`, request/response/WebSocket message types for orders, deposits, withdrawals, margin, and more.

**Constants:** `PAIR`, `ORDER_TYPE`, `ORDER_SIDE`, `ORDER_STATUS`, `CANDLE_TYPE`, `BITBANK_ERROR_CODE`, `EXCHANGE_STATUS`, `WITHDRAWAL_STATUS`, `DEPOSIT_STATUS`

---

## Logger

```typescript
import { setLogger } from '@pokooo/bb-api';

setLogger({
  error: (...args) => console.error('[bitbank]', ...args),
  info:  (...args) => console.info('[bitbank]',  ...args),
});
```

Set `BITBANKTRACE=1` to enable `logInfo` output to `console.info`.

---

## Development

```bash
pnpm build       # Compile TypeScript
pnpm test        # Run tests
pnpm check       # Biome lint + format check
pnpm check:fix   # Auto-fix
```

---

## Versioning / Release

[Changesets](https://github.com/changesets/changesets) でバージョンと CHANGELOG を管理しています。

1. **変更を記録**: `pnpm changeset` でバージョン種別（patch / minor / major）と説明を入力
2. **バージョン確定**: `pnpm run version` で `package.json` と `CHANGELOG.md` を更新
3. **ビルド**: `pnpm run build`
4. **公開**: `pnpm publish`（`publishConfig.access: "public"` 済みのためそのままで可）

一括でバージョン更新とビルドまで行う場合は `pnpm run release` を実行してください。

---

## License

[MIT](LICENSE)
