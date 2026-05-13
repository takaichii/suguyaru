"use client"

import { useState } from "react"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"
import type { Task } from "@/types"

type TaskItemProps = {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const [confirming, setConfirming] = useState(false)
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const removeTodayTask = useTodayStore((s) => s.removeTodayTask)

  const handleDelete = () => {
    removeTodayTask(task.id)
    deleteTask(task.id)
  }

  return (
    <div className="flex items-center gap-2 py-2 border-b border-terminal-border last:border-0 pl-4 pr-4">
      <span className="text-terminal-muted">&gt;</span>
      <span
        className={`flex-1 text-sm ${task.isDone ? "line-through text-terminal-muted" : "text-terminal-text"}`}
      >
        {task.title}
      </span>

      {confirming ? (
        <span className="flex items-center gap-2 text-sm">
          <span className="text-terminal-muted">削除しますか？</span>
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
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="text-terminal-muted text-sm hover:text-red-400 transition-colors"
        >
          [削除]
        </button>
      )}
    </div>
  )
}
