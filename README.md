# サブスク管理アプリ

登録したサブスクリプションを一括管理できるWebアプリです。  
登録済みのサブスク情報をもとに、AIに継続・解約の相談ができる機能も搭載予定です。

## 機能

- サブスクリプションの追加・編集・削除
- 一覧表示（サービス名・金額・次回請求日・カテゴリ・ステータス）
- AIへの相談機能（実装予定）
- ブラウザの拡張機能で所定のタブが開かれている時間を収集する機能(実装予定)

## 技術スタック

| 役割           | 技術                        |
| -------------- | --------------------------- |
| フロントエンド | React / TypeScript / Vite   |
| スタイリング   | Tailwind CSS                |
| バックエンド   | PocketBase                  |
| デプロイ       | Cloudflare Tunnel / Proxmox |

## セットアップ

### 必要なもの

- Node.js
- PocketBase

### 手順

1. リポジトリをクローン

```bash
git clone <git@github.com:miranop/subscription-app.git>
cd subscription-manager
```

2. 依存関係をインストール

```bash
npm install
```

3. 環境変数を設定

```bash
cp .env.example .env
```

`.env` を編集して PocketBase の URL を設定してください。

```env
VITE_POCKETBASE_URL=ここに自分で用意したURLを入れる
```

4. PocketBase を起動

PocketBase 公式サイト からバイナリをダウンロードして起動してください。

```bash
./pocketbase serve
```

5. PocketBase のコレクションを設定

管理画面（`http://localhost:8090/_/`）から以下のコレクションを作成してください。

**subscription コレクション**

| フィールド名      | 型       | 備考                                                        |
| ----------------- | -------- | ----------------------------------------------------------- |
| name              | text     | サービス名                                                  |
| price             | number   | 金額（円）                                                  |
| billing_cycle     | select   | monthly / yearly / weekly                                   |
| next_billing_date | date     | 次回請求日                                                  |
| category          | select   | entertainment / productivity / development / health / other |
| status            | select   | active / cancelled / paused                                 |
| notes             | text     | メモ                                                        |
| user              | relation | users コレクションへのリレーション                          |

**API ルール（subscription）**

| ルール      | 設定値                       |
| ----------- | ---------------------------- |
| リスト/検索 | `@request.auth.id = user.id` |
| 表示        | `@request.auth.id = user.id` |
| 作成        | `@request.auth.id != ""`     |
| 更新        | `@request.auth.id = user.id` |
| 削除        | `@request.auth.id = user.id` |

6. 開発サーバーを起動

```bash
npm run dev
```

## 今後の実装予定

- AIへの相談機能（サブスク情報をもとに継続・解約を提案）
- 月ごとの支出サマリー表示
- ハンバーガーメニュー対応（モバイル）
