# 初回実装 — 要求内容

## 概要

スグヤルの MVP を新規実装する。  
`docs/product-requirements.md` で定義した機能要件・非機能要件をすべて満たす初回リリース版。

---

## 実装する機能

| 機能 | 説明 |
|------|------|
| Goal 管理 | Goal の作成・一覧表示 |
| Task 管理 | Goal に紐づく Task の作成・一覧表示 |
| Today 選択 | 未完了 Task から最大5件を Today に選ぶ |
| Today 画面 | 選んだ Task のみ表示・チェックで完了 |
| データ永続化 | localStorage に全状態を保存（リロード後も維持） |

---

## ユーザーストーリー

```
As a ユーザー
I want to Goal を作成したい
So that タスクをグループ管理できる

As a ユーザー
I want to Goal に紐づく Task を作成したい
So that 何のためのタスクか明確にできる

As a ユーザー
I want to 未完了タスクから今日やるものを選びたい
So that 今日の行動を意識的に決められる

As a ユーザー
I want to Today 画面でタスクを完了チェックしたい
So that 今日の進捗を確認できる
```

---

## 受け入れ条件

- [ ] Goal を作成して一覧に表示できる
- [ ] Task を Goal に紐づけて作成できる
- [ ] /select 画面で未完了タスクを最大5件 Today に追加できる
- [ ] Today 画面で今日選んだタスクだけが表示される
- [ ] チェックで Task を完了/未完了にトグルできる
- [ ] 完了タスクは打ち消し線 + グレーで表示される
- [ ] ページリロード後もデータが失われない
- [ ] Neo Terminal テーマ（ダーク・monospace）が全画面に適用されている

---

## 制約事項

- バックエンドなし・localStorage のみ
- タスクの編集・削除は実装しない（MVP スコープ外）
- 認証なし
- Next.js App Router を使用
- 状態管理は Zustand + persist のみ
