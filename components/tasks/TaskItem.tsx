"use client"

import { useDeleteTask } from "@/hooks/useDeleteTask"
import ConfirmAction from "@/components/ui/ConfirmAction"
import type { Task } from "@/types"

type TaskItemProps = {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const deleteTask = useDeleteTask()

  return (
    <div className="flex items-center gap-2 py-2 border-b border-terminal-border last:border-0 pl-4 pr-4">
      <span className="text-terminal-muted">&gt;</span>
      <span
        className={`flex-1 text-sm ${task.isDone ? "line-through text-terminal-muted" : "text-terminal-text"}`}
      >
        {task.title}
      </span>
      <ConfirmAction
        triggerLabel="削除"
        message="削除しますか？"
        onConfirm={() => deleteTask(task.id)}
      />
    </div>
  )
}
