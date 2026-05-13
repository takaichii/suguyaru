"use client"

import { useTaskStore } from "@/stores/taskStore"
import type { Task } from "@/types"

type TodayItemProps = {
  task: Task
}

export default function TodayItem({ task }: TodayItemProps) {
  const toggleTaskDone = useTaskStore((s) => s.toggleTaskDone)

  return (
    <label className="flex items-center gap-3 py-2 border-b border-terminal-border last:border-0 cursor-pointer group px-4">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => toggleTaskDone(task.id)}
        className="accent-terminal-green shrink-0"
      />
      <span
        className={`text-sm transition-all duration-300 ${
          task.isDone
            ? "line-through text-terminal-muted"
            : "text-terminal-text group-hover:text-terminal-green"
        }`}
      >
        {task.title}
      </span>
    </label>
  )
}
