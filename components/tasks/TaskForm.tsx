"use client"

import { useState } from "react"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"

export default function TaskForm() {
  const [title, setTitle] = useState("")
  const [goalId, setGoalId] = useState("")
  const goals = useGoalStore((s) => s.goals)
  const addTask = useTaskStore((s) => s.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed || !goalId) return
    addTask(trimmed, goalId)
    setTitle("")
  }

  if (goals.length === 0) {
    return (
      <p className="text-terminal-muted text-sm mb-6">
        &gt; 先に Goal を作成してください。
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <div className="flex gap-2">
        <select
          value={goalId}
          onChange={(e) => setGoalId(e.target.value)}
          className="bg-terminal-bg border border-terminal-border text-terminal-text px-3 py-2 text-sm focus:outline-none focus:border-terminal-green"
        >
          <option value="">Goal を選択...</option>
          {goals.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスク名を入力..."
          maxLength={100}
          className="flex-1 bg-transparent border border-terminal-border text-terminal-text placeholder-terminal-muted px-3 py-2 text-sm focus:outline-none focus:border-terminal-green"
        />
        <button
          type="submit"
          className="text-terminal-green border border-terminal-green px-4 py-2 text-sm hover:bg-terminal-green hover:text-terminal-bg transition-colors"
        >
          + 追加
        </button>
      </div>
    </form>
  )
}
