"use client"

import { useTaskStore } from "@/stores/taskStore"
import type { Task } from "@/types"

type TodayItemProps = {
  task: Task
  isPending?: boolean
  isFirst?: boolean
  isLast?: boolean
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export default function TodayItem({ task, isPending, isFirst, isLast, onMoveUp, onMoveDown }: TodayItemProps) {
  const toggleTaskDone = useTaskStore((s) => s.toggleTaskDone)

  return (
    <div className="flex items-center gap-2 py-2 border-b border-terminal-border last:border-0 px-4 group">
      <label className="flex items-center gap-3 flex-1 cursor-pointer min-w-0">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => toggleTaskDone(task.id)}
          className="accent-terminal-green shrink-0"
        />
        {task.priority && !task.isDone && (
          <span className={`text-xs shrink-0 ${
            task.priority === "high" ? "text-red-400" : task.priority === "medium" ? "text-yellow-400" : "text-terminal-muted"
          }`}>
            {task.priority === "high" ? "[!]" : task.priority === "medium" ? "[~]" : "[-]"}
          </span>
        )}
        <span
          className={`text-sm transition-all duration-300 truncate ${
            task.isDone
              ? "line-through text-terminal-muted"
              : "text-terminal-text group-hover:text-terminal-green"
          }`}
        >
          {task.title}
        </span>
      </label>
      {isPending && (
        <div className="flex flex-col shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="text-terminal-muted hover:text-terminal-green disabled:opacity-20 disabled:cursor-not-allowed text-xs leading-none px-1"
            aria-label="上へ"
          >
            ▲
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="text-terminal-muted hover:text-terminal-green disabled:opacity-20 disabled:cursor-not-allowed text-xs leading-none px-1"
            aria-label="下へ"
          >
            ▼
          </button>
        </div>
      )}
    </div>
  )
}
