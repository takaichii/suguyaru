# 技術仕様書

## テクノロジースタック

| 役割 | 技術 | バージョン |
|------|------|-----------|
| フレームワーク | Next.js（App Router） | 14.x |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 3.x |
| 状態管理 | Zustand | 4.x |
| データ永続化 | localStorage（zustand/middleware の persist） | - |
| フォント | JetBrains Mono（Google Fonts） | - |

---

## 開発ツールと手法

| ツール | 用途 |
|--------|------|
| ESLint | 静的解析（Next.js 標準設定） |
| Prettier | コードフォーマット |
| TypeScript Compiler | 型チェック（`tsc --noEmit`） |

### パッケージマネージャー

npm を使用。

### 開発コマンド

```bash
npm run dev       # 開発サーバー起動
npm run build     # プロダクションビルド
npm run lint      # ESLint 実行
npm run type-check # 型チェック（tsc --noEmit）
```

---

## 状態管理設計

### Zustand + persist パターン

各 store は `persist` ミドルウェアで localStorage と自動同期する。

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GoalStore {
  goals: Goal[]
  addGoal: (title: string) => void
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (title) =>
        set((state) => ({
          goals: [...state.goals, { id: crypto.randomUUID(), title }],
        })),
    }),
    { name: 'suguyaru-goals' }
  )
)
```

### Store 一覧

| Store | localStorage キー | 主な責務 |
|-------|------------------|---------|
| `goalStore` | `suguyaru-goals` | Goal の CRUD |
| `taskStore` | `suguyaru-tasks` | Task の CRUD・isDone トグル |
| `todayStore` | `suguyaru-today` | TodayTask の追加・削除・取得 |

---

## UIテーマ仕様

### カラーパレット

| 役割 | CSS変数 / Tailwindクラス | 値 |
|------|--------------------------|----|
| 背景 | `bg-terminal-bg` | `#0B0B0B` |
| テキスト | `text-terminal-text` | `#E5E5E5` |
| アクセント | `text-terminal-green` | `#22C55E` |
| ボーダー | `border-terminal-border` | `#1F1F1F` |
| 補足テキスト | `text-terminal-muted` | `#6B7280` |

### Tailwind カスタムテーマ

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      terminal: {
        bg:     '#0B0B0B',
        text:   '#E5E5E5',
        green:  '#22C55E',
        border: '#1F1F1F',
        muted:  '#6B7280',
      },
    },
    fontFamily: {
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
}
```

---

## 技術的制約と要件

### 制約

| 項目 | 内容 |
|------|------|
| バックエンド | なし（localStorage のみ） |
| 認証 | なし |
| 外部API | なし |
| ブラウザサポート | モダンブラウザ（Chrome / Safari / Firefox 最新版） |

### 要件

- `crypto.randomUUID()` を ID 生成に使用（ブラウザネイティブ API）
- SSR での localStorage アクセスを避けるため、`persist` は hydration 後に動作させる
- Next.js の `"use client"` を Store・インタラクティブコンポーネントに明示する

---

## パフォーマンス要件

| 項目 | 目標値 |
|------|--------|
| 初回ページロード（LCP） | 2秒以内 |
| インタラクション応答（INP） | 体感上即時（< 100ms） |
| localStorage 読み書き | 同期処理のためページ遷移時に完了 |

### 想定データ量

| データ | 上限目安 |
|--------|---------|
| Goal 数 | 〜50件 |
| Task 数 | 〜500件 |
| TodayTask 数 | 日次5件 × 365日 = 年間1,825件 |

上記の範囲では localStorage の容量（5MB）に問題はない。
