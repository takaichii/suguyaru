# ユビキタス言語定義

コード・ドキュメント・会話で使う用語を統一する。

---

## ドメイン用語

| 日本語 | 英語（コード上） | 定義 |
|--------|----------------|------|
| ゴール | `Goal` | ユーザーが達成を目指す目標。Task の親となるグループ |
| タスク | `Task` | Goal に紐づく具体的な作業単位 |
| 今日のタスク | `TodayTask` | ユーザーが「今日やる」と選択した Task の参照と日付のペア |
| 完了 | `isDone: true` | Task が完了した状態 |
| 未完了 | `isDone: false` | Task がまだ完了していない状態 |

---

## UI/UX 用語

| 用語 | 定義 |
|------|------|
| Today 画面 | アプリのトップ画面（`/`）。今日選んだタスクのみ表示する |
| タスク選択画面 | 未完了タスクから Today に追加するタスクを選ぶ画面（`/select`） |
| Task 管理画面 | Task の作成・一覧確認画面（`/tasks`） |
| Goal 管理画面 | Goal の作成・一覧確認画面（`/goals`） |
| プロンプト行 | `>` プレフィックスで始まるターミナル風の行 |
| 5件上限 | Today に選択できるタスクの最大件数（= `MAX_TODAY_TASKS = 5`） |

---

## 英語・日本語対応表（コード命名基準）

| 日本語 | コード上の英語 | 補足 |
|--------|--------------|------|
| ゴール | `goal` / `Goal` | 単数形 |
| ゴール一覧 | `goals` | 複数形 |
| タスク | `task` / `Task` | 単数形 |
| タスク一覧 | `tasks` | 複数形 |
| 今日のタスク（モデル） | `todayTask` / `TodayTask` | 選択情報 |
| 今日のタスク一覧 | `todayTasks` | 複数形 |
| 完了フラグ | `isDone` | boolean |
| 日付 | `date` | `"YYYY-MM-DD"` 形式の文字列 |
| ゴールID | `goalId` | Task が参照する Goal の id |
| タスクID | `taskId` | TodayTask が参照する Task の id |

---

## コード上の命名規則（パターン集）

### Store

```ts
// ストア hook
useGoalStore
useTaskStore
useTodayStore

// ストアのアクション
addGoal(title: string)
addTask(title: string, goalId: string)
addTodayTask(taskId: string)
removeTodayTask(taskId: string)
toggleTaskDone(taskId: string)
```

### 定数

```ts
MAX_TODAY_TASKS = 5
```

### 日付処理

```ts
// 今日の日付文字列を取得する標準パターン
const today = new Date().toISOString().slice(0, 10)
// → "2026-05-13"
```

---

## ビジネス用語

| 用語 | 定義 |
|------|------|
| MVP | Minimum Viable Product。スグヤルの初期リリース版（Goal/Task/Today の基本機能のみ） |
| ターミナルUI | Neo Terminal テーマ。ダーク背景・monospace フォント・`>` プロンプトによるデザイン |
| 永続化 | localStorage への保存。ページリロード後もデータが失われない状態 |
