# 機能追加フェーズ — 設計ドキュメント（2026-05-18 時点）

## 概要

Vision 階層導入（2026-05-14）以降に追加・実装された全機能をまとめた設計ドキュメント。
MVP → Vision 階層 → 本ドキュメントの順で積み上げられている。

---

## 現在の画面構成

| URL | 画面名 | 説明 |
|-----|--------|------|
| `/` | Today | 今日やるタスクを表示・完了チェック |
| `/select` | Select | 未完了タスクから Today に追加するものを選ぶ |
| `/tasks` | Tasks | タスクの作成・一覧・検索 |
| `/goals` | Goals | Goal の作成・一覧（Vision グループ表示） |
| `/visions` | Visions | Vision の作成・一覧・インライン編集 |
| `/map` | Map | Vision → Goal → Task のツリービジュアル |
| `/stats` | Stats | 達成率・直近7日アクティビティ・Vision 別進捗 |

---

## 現在のデータモデル

```ts
type Vision = {
  id: string
  title: string
}

type Goal = {
  id: string
  title: string
  visionId?: string  // 未設定は「未分類」
}

type Task = {
  id: string
  title: string
  goalId: string
  isDone: boolean
}

type TodayTask = {
  taskId: string
  date: string  // "YYYY-MM-DD"
}
```

> **Note:** Task に `dueDate?: string` と `priority?: 'high' | 'medium' | 'low'` を追加する PR (#58, #59) が open 中。マージ後に型定義が拡張される。

---

## ストア一覧

| ファイル | persist key | 主な操作 |
|---------|------------|---------|
| `stores/visionStore.ts` | `suguyaru-visions` | addVision, updateVision, deleteVision |
| `stores/goalStore.ts` | `suguyaru-goals` | addGoal, deleteGoal, swapGoals(*) |
| `stores/taskStore.ts` | `suguyaru-tasks` | addTask, toggleTaskDone, deleteTask, swapTasks(*) |
| `stores/todayStore.ts` | `suguyaru-today` | addTodayTask, removeTodayTask, getTodayTasks, swapTodayTasks, cleanupOldTodayTasks |
| `stores/uiStore.ts` | `suguyaru-ui` | showCompletedTasks, collapsedVisionIds, collapsedGoalIds, taskSortOrder(*) |

(*) = open PR でのみ実装済み、main 未マージ

全ストアで `skipHydration: true` を使用。`StoreHydration.tsx` の `useEffect` 内で `persist.rehydrate()` を呼ぶことでクライアント側のみにデータを展開する。

---

## 確立されたデザインパターン

### 1. ハイドレーション安全パターン

`new Date()` をレンダーボディ内で呼ぶとサーバー（UTC）とクライアント（ローカルタイムゾーン）で差が出てハイドレーションエラーになる。

```tsx
// NG
const today = new Date().toISOString().slice(0, 10)  // render body

// OK
const [today, setToday] = useState("")
useEffect(() => { setToday(new Date().toISOString().slice(0, 10)) }, [])
if (!today) return null  // データに依存する計算がある場合は early return
```

### 2. ページヘッダー形式

Map 画面で確立したターミナル風コマンド行スタイルを全画面に統一。

```tsx
<div className="mb-6 font-mono">
  <p className="text-terminal-muted text-xs">$ tree --status ./visions</p>
  <p className="text-terminal-green text-sm mt-1">&gt; Visions</p>
</div>
```

| 画面 | コマンド行 |
|------|-----------|
| Visions | `$ ls ./visions` |
| Goals | `$ tree --status ./goals` |
| Tasks | `$ ls ./tasks` |
| Stats | `$ tree --status --stats` |
| Select | `$ queue --today ./tasks` |
| Map | `$ tree --status ./visions` |

### 3. 空状態ボックス形式

データが0件のときは Map と同じボックス形式で表示。

```tsx
<div className="font-mono border border-terminal-border px-4 py-6 text-center space-y-2">
  <p className="text-terminal-muted text-xs">$ ls ./visions</p>
  <p className="text-terminal-muted text-xs">0 visions, 0 goals, 0 tasks</p>
  <p className="text-terminal-muted text-xs mt-2">Vision を作成するとここに表示されます。</p>
</div>
```

### 4. インライン編集 (`components/ui/InlineEdit.tsx`)

`value` / `onCommit` / `className` を受け取る汎用コンポーネント。
現在は Vision タイトルに使用。Goal・Task タイトルにも適用可能。

### 5. 削除確認 (`components/ui/ConfirmAction.tsx`)

`triggerLabel` / `message` / `onConfirm` を受け取る汎用コンポーネント。
削除ボタンに一貫して使用。

---

## 実装済み機能（Vision 階層以降）

### マージ済み (main)

| PR | 機能 | 主な変更ファイル |
|----|------|----------------|
| #32 | Goal・Task 一覧のアコーディオン折りたたみ | GoalList, TaskList, uiStore |
| #33 | Vision 達成度ゲージ | VisionList, VisionItem |
| #34 | Map ツリービュー | app/map, components/map/* |
| #36 | Map ターミナル風リデザイン | MapTree, MapVisionNode, MapGoalNode |
| #37 | Goal・Task インライン編集 | GoalItem, TaskItem, components/ui/InlineEdit |
| #38 | PWA 対応 | app/manifest.ts, public/sw.js, PwaRegistration |
| #39 | Today タスク並び替え | TodayList, TodayItem, todayStore (swapTodayTasks) |
| #40 | Tasks 画面キーワード検索 | TaskList |
| #41 | キーボードショートカット | KeyboardShortcuts (N/Space/?) |
| #53 | Vision インライン編集 | VisionItem, visionStore (updateVision), InlineEdit |
| #54 | Select 画面キーワード検索 | SelectList |
| #55 | Map でタスク完了トグル | MapGoalNode |
| #56 | Today 完了フィードバック | TodayItem (justDone flash, [DONE] badge), TodayList (progress bar, showAllDone) |
| #61 | Stats ページ | app/stats, StatsView |
| #62 | ターミナル風ヘッダー統一 | 全 page.tsx, VisionList, GoalList, TaskList, SelectList |

### open PR（未マージ）

| PR | 機能 | 主な変更ファイル |
|----|------|----------------|
| #57 | Goal・Task 並び替え | GoalList, GoalItem, TaskList, TaskItem, goalStore (swapGoals), taskStore (swapTasks) |
| #58 | タスク期限設定 | types (dueDate?), taskStore, TaskForm, TaskItem |
| #59 | タスク優先度 | types (priority?), taskStore, TaskForm, TaskItem |
| #60 | タスク一覧ソート | TaskList (Goal/新着/期限), uiStore (taskSortOrder) |

---

## ファイル構成（現在）

```
app/
  layout.tsx                 # SplashScreen, KeyboardShortcuts, StoreHydration
  page.tsx                   # Today
  goals/page.tsx
  map/page.tsx
  select/page.tsx
  stats/page.tsx
  tasks/page.tsx
  visions/page.tsx
  manifest.ts                # PWA manifest

components/
  layout/
    Header.tsx               # ナビゲーション（Today/Select/Tasks/Goals/Visions/Map/Stats）
    KeyboardShortcuts.tsx    # N: 新規入力フォーカス / Space: 先頭タスク完了 / ?: ヘルプ
    SplashScreen.tsx         # 起動時ターミナルアニメーション
    StoreHydration.tsx       # persist.rehydrate() をまとめて呼ぶ
    PwaRegistration.tsx      # Service Worker 登録
  goals/
    GoalForm.tsx             # Vision 選択ドロップダウン付き
    GoalItem.tsx             # インライン編集・削除確認
    GoalList.tsx             # Vision グループ + アコーディオン
  tasks/
    TaskForm.tsx             # Goal 選択ドロップダウン付き
    TaskItem.tsx             # インライン編集・削除確認
    TaskList.tsx             # Goal グループ + 検索 + 完了表示トグル
    BulkDeleteCompletedButton.tsx
  today/
    TodayList.tsx            # 進捗バー・並び替え・全完了フィードバック
    TodayItem.tsx            # 完了フラッシュ・[DONE]バッジ・並び替えボタン
  select/
    SelectList.tsx           # Vision/Goal グループ + 検索 + 5件上限
    SelectItem.tsx
  visions/
    VisionForm.tsx
    VisionItem.tsx           # インライン編集・達成度バー・削除確認
    VisionList.tsx
  map/
    MapTree.tsx              # OVERVIEW パネル + Vision ノード一覧
    MapVisionNode.tsx        # $ tree --status ./visions 風表示
    MapGoalNode.tsx          # Goal ノード + タスク完了トグル
  stats/
    StatsView.tsx            # SUMMARY / LAST 7 DAYS / BY VISION
  ui/
    InlineEdit.tsx           # 汎用インライン編集（クリックで編集モード）
    ConfirmAction.tsx        # 汎用削除確認

stores/
  visionStore.ts
  goalStore.ts
  taskStore.ts
  todayStore.ts
  uiStore.ts

hooks/
  useDeleteVision.ts        # Vision + Goal + Task + TodayTask 連鎖削除
  useDeleteGoal.ts          # Goal + Task + TodayTask 連鎖削除
  useDeleteTask.ts          # Task + TodayTask 連鎖削除

lib/
  constants.ts              # MAX_TODAY_TASKS = 5

types/
  index.ts                  # Vision, Goal, Task, TodayTask
```

---

## 今後の課題・検討事項

- open PR (#57〜#60) のマージ後に型定義・ストアを更新すること
- Task に `dueDate` / `priority` が追加された場合、Stats の集計に期限切れ件数なども追加できる
- Vision・Goal の並び替えも今後の候補
