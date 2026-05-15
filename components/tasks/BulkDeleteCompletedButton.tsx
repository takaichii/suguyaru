"use client"

import { useState } from "react"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"

export default function BulkDeleteCompletedButton() {
  const [confirming, setConfirming] = useState(false)
  const { tasks, deleteCompletedTasks } = useTaskStore()
  const removeTodayTasksByIds = useTodayStore((s) => s.removeTodayTasksByIds)

  const completedCount = tasks.filter((t) => t.isDone).length

  if (completedCount === 0) return null

  const handleDelete = () => {
    const deletedIds = deleteCompletedTasks()
    removeTodayTasksByIds(deletedIds)
    setConfirming(false)
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2 text-sm">
        <span className="text-terminal-muted">{completedCount} 件削除しますか？</span>
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          [はい]
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-terminal-muted hover:text-terminal-text transition-colors"
        >
          [いいえ]
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-terminal-muted text-sm hover:text-red-400 transition-colors"
    >
      [完了済みをすべて削除]
    </button>
  )
}
