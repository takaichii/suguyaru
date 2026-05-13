"use client"

import { useTaskStore } from "@/stores/taskStore"
import type { Task } from "@/types"

type TodayItemProps = {
  task: Task
}

export default function TodayItem({ task }: TodayItemProps) {
  const toggleTaskDone = useTaskStore((s) => s.toggleTaskDone)

  return (
    <label className="flex items-center gap-3 py-2 border-b border-terminal-border last:border-0 cursor-pointer">
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => toggleTaskDone(task.id)}
        className="accent-terminal-green"
      />
      <span
        className={
          task.isDone
            ? "line-through text-terminal-muted text-sm"
            : "text-terminal-text text-sm"
        }
      >
        {task.title}
      </span>
    </label>
  )
}
