# Open Stack API Prisma

Cloudflare Workers、Hono、Prisma、D1 を組み合わせた API テンプレート。

```bash
vp install
vp run dev
```

## 検証

```bash
vp lint
vp fmt
vp test
vp run check
```

## マイグレーション

以下のコマンドで空のファイルを作成します。

```
vp exec wrangler d1 migrations create open-sandbox-database create_user_table
```

次に、差分を計算しファイルの中にSQLを書き込むのですが、初回の場合は差分がないので `--from-empty` を使います。

```
vp exec prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --output prisma/migrations/0001_create_user_table.sql --script
```

以下のコマンドでローカルのデータベースを更新します。

```
vp exec wrangler d1 migrations apply open-sandbox-database --local
```

2回目以降の場合は、ローカルのデータベースのとの差分を計算します。

```
vp exec prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-local-d1 --script
```
