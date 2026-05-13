# 初回実装 — タスクリスト

## 進捗凡例
- [ ] 未着手
- [x] 完了

---

## フェーズ 1：プロジェクトセットアップ

- [x] 1-1. `create-next-app` で Next.js + TypeScript + Tailwind のプロジェクトを作成
- [x] 1-2. `zustand` をインストール
- [x] 1-3. `app/globals.css` に terminal カラー（Tailwind v4 `@theme`）を設定
- [x] 1-4. `app/globals.css` にベーススタイル（背景色・フォント）を設定
- [x] 1-5. Google Fonts（JetBrains Mono）を `app/layout.tsx` に追加

## フェーズ 2：型定義・ストア

- [x] 2-1. `types/index.ts` に `Goal` / `Task` / `TodayTask` 型を定義
- [x] 2-2. `stores/goalStore.ts` を実装（`addGoal`・persist）
- [x] 2-3. `stores/taskStore.ts` を実装（`addTask`・`toggleTaskDone`・persist）
- [x] 2-4. `stores/todayStore.ts` を実装（`addTodayTask`・`removeTodayTask`・getTodayTasks・persist）

## フェーズ 3：共通コンポーネント

- [x] 3-1. `components/layout/Header.tsx` を実装（ナビゲーション・現在ページハイライト）

## フェーズ 4：Goal 管理

- [x] 4-1. `components/goals/GoalForm.tsx` を実装
- [x] 4-2. `components/goals/GoalItem.tsx` を実装
- [x] 4-3. `components/goals/GoalList.tsx` を実装
- [x] 4-4. `app/goals/page.tsx` を実装

## フェーズ 5：Task 管理

- [x] 5-1. `components/tasks/TaskItem.tsx` を実装
- [x] 5-2. `components/tasks/TaskList.tsx` を実装
- [x] 5-3. `components/tasks/TaskForm.tsx` を実装（Goal セレクト付き）
- [x] 5-4. `app/tasks/page.tsx` を実装

## フェーズ 6：タスク選択

- [x] 6-1. `components/select/SelectItem.tsx` を実装
- [x] 6-2. `components/select/SelectList.tsx` を実装（Goal グループ・5件上限制御）
- [x] 6-3. `app/select/page.tsx` を実装

## フェーズ 7：Today 画面

- [x] 7-1. `components/today/TodayItem.tsx` を実装（チェックボックス・完了スタイル）
- [x] 7-2. `components/today/TodayList.tsx` を実装
- [x] 7-3. `app/page.tsx` を実装

## フェーズ 8：結合・品質チェック

- [x] 8-1. 全画面のナビゲーション動作確認
- [x] 8-2. localStorage 永続化の動作確認（リロード後のデータ維持）
- [x] 8-3. 5件上限の動作確認
- [x] 8-4. `npm run lint` エラーゼロ
- [x] 8-5. `npm run type-check` エラーゼロ（`npx tsc --noEmit`）
- [x] 8-6. `npm run build` 成功

---

## 完了条件

- [x] `requirements.md` の受け入れ条件がすべてチェックされている
- [x] ビルドが通る
- [x] Neo Terminal テーマが全画面に適用されている
