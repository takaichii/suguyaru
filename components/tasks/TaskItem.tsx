"use client"

import { useTaskStore } from "@/stores/taskStore"
import { useDeleteTask } from "@/hooks/useDeleteTask"
import ConfirmAction from "@/components/ui/ConfirmAction"
import InlineEdit from "@/components/ui/InlineEdit"
import type { Task } from "@/types"

function dueDateColor(dueDate: string, isDone: boolean): string {
  if (isDone) return "text-terminal-muted"
  const today = new Date().toISOString().slice(0, 10)
  const diff = (new Date(dueDate).getTime() - new Date(today).getTime()) / 86400000
  if (diff < 0) return "text-red-400"
  if (diff <= 3) return "text-yellow-400"
  return "text-terminal-muted"
}

type TaskItemProps = {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const updateTask = useTaskStore((s) => s.updateTask)
  const deleteTask = useDeleteTask()

  return (
    <div className="flex items-center gap-2 py-2 border-b border-terminal-border last:border-0 pl-4 pr-4">
      <span className="text-terminal-muted">&gt;</span>
      <InlineEdit
        value={task.title}
        onCommit={(title) => updateTask(task.id, title)}
        className={`flex-1 text-sm ${task.isDone ? "line-through text-terminal-muted" : ""}`}
      />
      {task.dueDate && (
        <span className={`text-xs shrink-0 ${dueDateColor(task.dueDate, task.isDone)}`}>
          {task.dueDate}
        </span>
      )}
      <ConfirmAction
        triggerLabel="削除"
        message="削除しますか？"
        onConfirm={() => deleteTask(task.id)}
      />
    </div>
  )
}
