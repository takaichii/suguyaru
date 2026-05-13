# 開発ガイドライン

## コーディング規約

### 基本方針

- TypeScript の型を徹底し、`any` は使用しない
- `"use client"` はインタラクティブなコンポーネント・ストアにのみ付与する
- 副作用（localStorage アクセス等）はストアに閉じ込め、コンポーネントに書かない
- コメントは WHY が非自明な場合のみ書く（何をしているかは書かない）

### 関数・変数

```ts
// ✅ Good
const addGoal = (title: string) => { ... }
const isOverLimit = todayTasks.length >= 5

// ❌ Bad
const f = (t: string) => { ... }
const flag = list.length >= 5
```

### 型定義

```ts
// ✅ Props 型はコンポーネントファイル内に定義
type TodayItemProps = {
  task: Task
  onToggle: (id: string) => void
}

// ✅ ドメイン型は types/index.ts に定義
// types/index.ts
export type Goal = { ... }
```

---

## 命名規則

| 対象 | 規則 | 例 |
|------|------|----|
| コンポーネント | PascalCase | `TodayItem`, `GoalForm` |
| ファイル（コンポーネント） | PascalCase | `TodayItem.tsx` |
| ファイル（store / util） | camelCase | `goalStore.ts` |
| 変数・関数 | camelCase | `addGoal`, `todayTasks` |
| 型・インターフェース | PascalCase | `Goal`, `TodayTask`, `GoalStore` |
| 定数 | UPPER_SNAKE_CASE | `MAX_TODAY_TASKS` |
| CSS クラス（Tailwind） | そのまま使用 | `bg-terminal-bg` |

### 特定の命名パターン

| パターン | 例 |
|---------|-----|
| boolean 変数・Props | `is` / `has` プレフィックス（`isDone`, `isOverLimit`） |
| イベントハンドラー Props | `on` プレフィックス（`onToggle`, `onAdd`） |
| イベントハンドラー実装 | `handle` プレフィックス（`handleToggle`, `handleAdd`） |
| Store hook | `use` + ドメイン名 + `Store`（`useGoalStore`） |

---

## スタイリング規約

### Tailwind CSS の使用ルール

- インラインスタイル（`style={}` 属性）は使用しない
- カスタムカラーは `tailwind.config.ts` に定義した `terminal.*` クラスを使う
- 共通のスタイルパターンはコンポーネント化して再利用する

### ターミナルUIの表現

```tsx
// ✅ プロンプト行
<p className="text-terminal-green font-mono">{'>'} 今日のタスク</p>

// ✅ 完了済みタスク
<span className={`font-mono ${task.isDone ? 'line-through text-terminal-muted' : 'text-terminal-text'}`}>
  {task.title}
</span>

// ✅ ボーダー区切り
<hr className="border-terminal-border my-4" />
```

### レスポンシブ

- モバイルファーストで記述する
- ブレークポイントは `sm:` `md:` を必要に応じて使用する
- ナビゲーションはヘッダーに配置（モバイル対応はフレックスラップで対応）

---

## テスト規約

MVP フェーズではユニットテスト・E2Eテストは必須としない。
ただし以下を品質チェックとして必ず実行する。

```bash
npm run lint        # ESLint エラーゼロ
npm run type-check  # TypeScript エラーゼロ
npm run build       # ビルド成功
```

将来的にテストを追加する場合は Vitest + Testing Library を想定。

---

## Git 規約

### ブランチ戦略

```
main          # 本番リリース可能な状態を維持
└── feature/  # 機能追加
└── fix/      # バグ修正
└── docs/     # ドキュメント修正
```

### コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) に従う。

```
<type>: <subject>

feat: Today 画面にタスク件数バッジを追加
fix: 5件上限超過時のチェック解除バグを修正
docs: functional-design.md にワイヤフレームを追加
refactor: TodayList をコンポーネント分割
style: ヘッダーのナビリンク間隔を調整
chore: Tailwind カスタムカラーを追加
```

| type | 用途 |
|------|------|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメント変更 |
| `refactor` | リファクタリング（機能変更なし） |
| `style` | UI の見た目の調整 |
| `chore` | 設定・依存関係の変更 |

### PR ルール

- 1 PR = 1 機能または 1 バグ修正
- PR マージ前に `lint` / `type-check` / `build` が通ること
