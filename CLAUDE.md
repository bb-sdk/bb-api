# bitbank-api — Development Notes

See `../CLAUDE.md` for the shared commit message convention.

## Project Overview

TypeScript client library for bitbank.cc. Targets Node.js; uses Web Crypto API for request signing.

## Package Manager

Use **pnpm**.

## Key Commands

```bash
pnpm build        # tsc (tsconfig.build.json)
pnpm test         # vitest run
pnpm check        # Biome lint + format check
pnpm check:fix    # Auto-fix
```

## Code Style

- Formatter / linter: **Biome** (`biome.json`). Do not add ESLint or Prettier.
- `type: "module"` — use ESM imports only.

## Architecture

| File | Role |
|------|------|
| `src/rest-client.ts` | Authenticated REST (private API) |
| `src/public-rest-client.ts` | Unauthenticated REST (public API) |
| `src/public-stream-client.ts` | Public WebSocket via Socket.IO |
| `src/private-stream-client.ts` | Private stream via PubNub |
| `src/util/BaseRestClient.ts` | Shared HTTP + signing logic |
| `src/types/` | Request / response / WebSocket types |
| `src/constants/enum.ts` | All constants (PAIR, ORDER_TYPE, etc.) |
