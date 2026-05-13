"use client"

import { useRef, useState } from "react"
import { useGoalStore } from "@/stores/goalStore"

export default function GoalForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const addGoal = useGoalStore((s) => s.addGoal)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setError("> Goal 名を入力してください")
      inputRef.current?.focus()
      return
    }
    setError("")
    addGoal(trimmed)
    setTitle("")
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError("")
          }}
          placeholder="Goal 名を入力..."
          maxLength={100}
          className={`flex-1 bg-transparent border text-terminal-text placeholder-terminal-muted px-3 py-2 text-sm focus:outline-none transition-colors ${
            error ? "border-red-400" : "border-terminal-border focus:border-terminal-green"
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
