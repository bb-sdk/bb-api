# Changesets

このディレクトリは [Changesets](https://github.com/changesets/changesets) 用です。

## リリースの流れ

1. **変更内容を記録する**  
   `pnpm changeset` を実行し、バージョン上げの種類（patch / minor / major）と変更説明を入力する。

2. **バージョン確定と CHANGELOG 更新**  
   `pnpm run version` を実行する。changeset が消費され、`package.json` の version と `CHANGELOG.md` が更新される。

3. **ビルドして公開**  
   `pnpm run build` のあと、`pnpm publish` で npm に公開する。スコープ付きパッケージ（`@bb-api`）の初回公開時は `pnpm publish --access public` を使う。

## スクリプト

- `pnpm changeset` … 変更セットを追加
- `pnpm run version` … 変更セットを適用してバージョンと CHANGELOG を更新
