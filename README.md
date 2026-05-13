# スグヤル

**未来を、今の行動に。**

「今日やるタスクを自分で選ぶこと」に特化したシンプルなタスク管理アプリ。

## 概要

毎日、自分の意志で「今日やること」を最大5件選ぶ。  
選んだタスクだけが Today 画面に表示される。

## 技術スタック

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS v4
- Zustand (localStorage 永続化)

## セットアップ

```bash
npm install
npm run dev
```

http://localhost:3000 をブラウザで開く。

## 画面構成

| パス | 画面 |
|------|------|
| `/` | Today — 今日のタスク一覧・完了チェック |
| `/select` | タスク選択 — Today に追加するタスクを選ぶ（最大5件） |
| `/tasks` | Task 管理 — タスクの作成・一覧 |
| `/goals` | Goal 管理 — 目標の作成・一覧 |

## データ

すべてのデータは localStorage に保存される。バックエンド・認証なし。

## ディレクトリ構成

```
app/          # Next.js ページ
components/   # UI コンポーネント
stores/       # Zustand ストア
types/        # 共通型定義
docs/         # 設計ドキュメント
.steering/    # 作業単位のドキュメント
```
