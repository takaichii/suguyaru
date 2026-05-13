# 初回実装 — 設計

## 実装アプローチ

1. Next.js プロジェクトを新規作成（`create-next-app`）
2. Tailwind カスタムテーマ（terminal カラー・JetBrains Mono）を設定
3. 型定義（`types/index.ts`）を作成
4. Zustand ストア（goal / task / today）を作成
5. コンポーネントをボトムアップで実装（小→大）
6. ページを組み立てて動作確認

---

## 実装するコンポーネントと変更点

### 新規作成ファイル一覧

```
types/
  index.ts

stores/
  goalStore.ts
  taskStore.ts
  todayStore.ts

components/
  layout/
    Header.tsx
  today/
    TodayList.tsx
    TodayItem.tsx
  select/
    SelectList.tsx
    SelectItem.tsx
  tasks/
    TaskForm.tsx
    TaskList.tsx
    TaskItem.tsx
  goals/
    GoalForm.tsx
    GoalList.tsx
    GoalItem.tsx

app/
  layout.tsx
  globals.css
  page.tsx
  select/page.tsx
  tasks/page.tsx
  goals/page.tsx

tailwind.config.ts
```

---

## データ構造

`docs/data-model` 参照。変更なし。

```ts
// types/index.ts
export type Goal = {
  id: string
  title: string
}

export type Task = {
  id: string
  title: string
  goalId: string
  isDone: boolean
}

export type TodayTask = {
  taskId: string
  date: string
}
```

---

## ストア設計詳細

### goalStore

```ts
interface GoalStore {
  goals: Goal[]
  addGoal: (title: string) => void
}
// persist key: 'suguyaru-goals'
```

### taskStore

```ts
interface TaskStore {
  tasks: Task[]
  addTask: (title: string, goalId: string) => void
  toggleTaskDone: (taskId: string) => void
}
// persist key: 'suguyaru-tasks'
```

### todayStore

```ts
interface TodayStore {
  todayTasks: TodayTask[]
  addTodayTask: (taskId: string) => void
  removeTodayTask: (taskId: string) => void
  getTodayTasks: () => TodayTask[]  // 今日日付のみフィルタ
}
// persist key: 'suguyaru-today'
```

---

## 各画面のデータフロー

### Today 画面（`/`）

```
todayStore.todayTasks
  → date === today でフィルタ
  → taskId で taskStore.tasks から Task を取得
  → TodayList / TodayItem に渡す
  → チェック → taskStore.toggleTaskDone(taskId)
```

### タスク選択画面（`/select`）

```
taskStore.tasks（isDone: false のみ）
  → goalId でグループ化
  → todayStore.getTodayTasks() で選択済み状態を初期化
  → チェック ON  → todayStore.addTodayTask(taskId)
  → チェック OFF → todayStore.removeTodayTask(taskId)
  → 「追加する」→ router.push('/')
```

### Task 管理画面（`/tasks`）

```
goalStore.goals → TaskForm の Goal セレクト
taskStore.tasks → goalId でグループ化して表示
TaskForm 送信 → taskStore.addTask(title, goalId)
```

### Goal 管理画面（`/goals`）

```
goalStore.goals → GoalList に渡す
taskStore.tasks → Goal ごとのタスク件数カウント
GoalForm 送信 → goalStore.addGoal(title)
```

---

## 影響範囲

初回実装のため既存コードへの影響なし。  
全ファイルが新規作成。
