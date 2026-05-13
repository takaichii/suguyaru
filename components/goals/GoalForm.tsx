"use client"

import { useState } from "react"
import { useGoalStore } from "@/stores/goalStore"

export default function GoalForm() {
  const [title, setTitle] = useState("")
  const addGoal = useGoalStore((s) => s.addGoal)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    addGoal(trimmed)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Goal 名を入力..."
        maxLength={100}
        className="flex-1 bg-transparent border border-terminal-border text-terminal-text placeholder-terminal-muted px-3 py-2 text-sm focus:outline-none focus:border-terminal-green"
      />
      <button
        type="submit"
        className="text-terminal-green border border-terminal-green px-4 py-2 text-sm hover:bg-terminal-green hover:text-terminal-bg transition-colors"
      >
        + 追加
      </button>
    </form>
  )
}
