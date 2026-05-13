"use client"

import { useRef, useState } from "react"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"

export default function TaskForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [goalId, setGoalId] = useState("")
  const [error, setError] = useState("")
  const goals = useGoalStore((s) => s.goals)
  const addTask = useTaskStore((s) => s.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!goalId) {
      setError("> Goal を選択してください")
      return
    }
    if (!trimmed) {
      setError("> タスク名を入力してください")
      inputRef.current?.focus()
      return
    }
    setError("")
    addTask(trimmed, goalId)
    setTitle("")
    inputRef.current?.focus()
  }

  if (goals.length === 0) {
    return (
      <p className="text-terminal-muted text-sm mb-6">
        &gt; 先に Goal を作成してください。
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <select
          value={goalId}
          onChange={(e) => {
            setGoalId(e.target.value)
            if (error) setError("")
          }}
          className={`bg-terminal-bg border text-terminal-text px-3 py-2 text-sm focus:outline-none transition-colors ${
            error && !goalId ? "border-red-400" : "border-terminal-border focus:border-terminal-green"
          }`}
        >
          <option value="">Goal を選択...</option>
          {goals.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError("")
          }}
          placeholder="タスク名を入力..."
          maxLength={100}
          className={`flex-1 bg-transparent border text-terminal-text placeholder-terminal-muted px-3 py-2 text-sm focus:outline-none transition-colors min-w-0 ${
            error && goalId && !title.trim() ? "border-red-400" : "border-terminal-border focus:border-terminal-green"
          }`}
        />
        <button
          type="submit"
          className="text-terminal-green border border-terminal-green px-4 py-2 text-sm hover:bg-terminal-green hover:text-terminal-bg transition-colors"
        >
          + 追加
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </form>
  )
}
