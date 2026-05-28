"use client"

import { useTaskStore } from "@/stores/taskStore"
import { useDeleteTask } from "@/hooks/useDeleteTask"
import ConfirmAction from "@/components/ui/ConfirmAction"
import InlineEdit from "@/components/ui/InlineEdit"
import type { Task } from "@/types"

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
      {task.priority && !task.isDone && (
        <span className={`text-xs shrink-0 ${
          task.priority === "high" ? "text-red-400" : task.priority === "medium" ? "text-yellow-400" : "text-terminal-muted"
        }`}>
          {task.priority === "high" ? "[!]" : task.priority === "medium" ? "[~]" : "[-]"}
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
