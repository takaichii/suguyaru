# リポジトリ構造定義書

## フォルダ・ファイル構成

```
suguyaru/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx                # Today 画面（/）
│   ├── globals.css             # グローバルスタイル
│   ├── select/
│   │   └── page.tsx            # タスク選択画面（/select）
│   ├── tasks/
│   │   └── page.tsx            # Task 管理画面（/tasks）
│   └── goals/
│       └── page.tsx            # Goal 管理画面（/goals）
│
├── components/                 # UI コンポーネント
│   ├── layout/
│   │   └── Header.tsx          # 共通ヘッダー・ナビゲーション
│   ├── today/
│   │   ├── TodayList.tsx       # Today タスク一覧
│   │   └── TodayItem.tsx       # Today タスク1件
│   ├── select/
│   │   ├── SelectList.tsx      # 選択可能なタスク一覧
│   │   └── SelectItem.tsx      # 選択可能なタスク1件
│   ├── tasks/
│   │   ├── TaskForm.tsx        # Task 作成フォーム
│   │   ├── TaskList.tsx        # Task 一覧
│   │   └── TaskItem.tsx        # Task 1件
│   └── goals/
│       ├── GoalForm.tsx        # Goal 作成フォーム
│       ├── GoalList.tsx        # Goal 一覧
│       └── GoalItem.tsx        # Goal 1件
│
├── stores/                     # Zustand ストア
│   ├── goalStore.ts            # Goal の状態管理
│   ├── taskStore.ts            # Task の状態管理
│   └── todayStore.ts           # TodayTask の状態管理
│
├── types/
│   └── index.ts                # 共通型定義（Goal / Task / TodayTask）
│
├── docs/                       # 永続的ドキュメント
│   ├── product-requirements.md
│   ├── functional-design.md
│   ├── architecture.md
│   ├── repository-structure.md
│   ├── development-guidelines.md
│   └── glossary.md
│
├── .steering/                  # 作業単位のドキュメント
│   └── [YYYYMMDD]-[title]/
│       ├── requirements.md
│       ├── design.md
│       └── tasklist.md
│
├── CLAUDE.md                   # Claude Code 向けプロジェクトメモリ
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── .eslintrc.json
```

---

## ディレクトリの役割

| ディレクトリ | 役割 |
|-------------|------|
| `app/` | Next.js App Router のページ定義。各ページはルートに対応するファイルのみ持つ |
| `components/` | UI コンポーネント。ページ名と同じサブディレクトリで整理する |
| `stores/` | Zustand ストア。1 ドメイン = 1 ファイル |
| `types/` | 全体で共有する型定義。アプリ固有の型はすべてここに集約 |
| `docs/` | 永続的な設計ドキュメント。実装に依存しない設計方針を記述 |
| `.steering/` | 作業単位のドキュメント。実装タスクごとにサブディレクトリを作成 |

---

## ファイル配置ルール

### コンポーネント

- `components/{画面名}/{ComponentName}.tsx` の形式で配置する
- 複数画面で共有するコンポーネントは `components/common/` に配置する
- 1 ファイル = 1 コンポーネント（デフォルトエクスポート）

### ストア

- `stores/{domain}Store.ts` の形式で配置する
- ストアのインターフェース型はストアファイル内に定義する

### 型定義

- アプリ全体で使う型（`Goal` / `Task` / `TodayTask`）は `types/index.ts` に定義する
- コンポーネント固有の Props 型はコンポーネントファイル内に定義する

### ページ

- `app/{route}/page.tsx` に配置する
- ページファイルはデータの取得・組み合わせに集中し、表示ロジックはコンポーネントに委ねる
- `"use client"` ディレクティブはインタラクティブなコンポーネント・ストアに付与し、ページファイル自体には基本不要

### ドキュメント

- 永続的ドキュメントは `docs/` に配置し、CLAUDE.md で定義されたファイル名を使う
- 作業単位のドキュメントは `.steering/[YYYYMMDD]-[title]/` に配置する
