"use client"

import { useEffect, useRef, useState } from "react"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"

export default function TaskForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState("")
  const [goalId, setGoalId] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")
  const goals = useGoalStore((s) => s.goals)
  const addTask = useTaskStore((s) => s.addTask)

  const selectedGoal = goals.find((g) => g.id === goalId)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectGoal = (id: string) => {
    setGoalId(id)
    setIsOpen(false)
    if (error) setError("")
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!goalId) {
      setError("> Goal を選択してください")
      setIsOpen(true)
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
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      {/* Goal 選択 */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className={`w-full flex items-center justify-between px-3 py-2 text-sm border transition-colors text-left ${
            error && !goalId
              ? "border-red-400 text-red-400"
              : isOpen
              ? "border-terminal-green text-terminal-text"
              : "border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-text"
          }`}
        >
          <span>
            {selectedGoal ? (
              <>
                <span className="text-terminal-muted mr-2">Goal:</span>
                <span className="text-terminal-green">{selectedGoal.title}</span>
              </>
            ) : (
              "> Goal を選択..."
            )}
          </span>
          <span className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full border border-terminal-green bg-terminal-bg mt-px">
            {goals.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => handleSelectGoal(g.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors hover:bg-terminal-green hover:text-terminal-bg ${
                  g.id === goalId ? "text-terminal-green" : "text-terminal-text"
                }`}
              >
                <span className="text-terminal-muted">&gt;</span>
                {g.title}
                {g.id === goalId && <span className="ml-auto text-xs">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* タスク名 + 追加ボタン */}
      <div className="flex gap-2">
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
            error && goalId && !title.trim()
              ? "border-red-400"
              : "border-terminal-border focus:border-terminal-green"
          }`}
        />
        <button
          type="submit"
          className="text-terminal-green border border-terminal-green px-4 py-2 text-sm hover:bg-terminal-green hover:text-terminal-bg transition-colors shrink-0"
        >
          + 追加
        </button>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </form>
  )
}
