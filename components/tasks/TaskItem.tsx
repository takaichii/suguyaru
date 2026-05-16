"use client"

import { useTaskStore } from "@/stores/taskStore"
import { useDeleteTask } from "@/hooks/useDeleteTask"
import ConfirmAction from "@/components/ui/ConfirmAction"
import InlineEdit from "@/components/ui/InlineEdit"
import type { Task } from "@/types"

type TaskItemProps = {
  task: Task
  isFirst?: boolean
  isLast?: boolean
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export default function TaskItem({ task, isFirst, isLast, onMoveUp, onMoveDown }: TaskItemProps) {
  const updateTask = useTaskStore((s) => s.updateTask)
  const deleteTask = useDeleteTask()

  return (
    <div className="flex items-center gap-2 py-2 border-b border-terminal-border last:border-0 pl-4 pr-4 group">
      <div className="flex flex-col shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onMoveUp} disabled={isFirst} className="text-terminal-muted hover:text-terminal-green disabled:opacity-20 disabled:cursor-not-allowed text-xs leading-none">▲</button>
        <button onClick={onMoveDown} disabled={isLast} className="text-terminal-muted hover:text-terminal-green disabled:opacity-20 disabled:cursor-not-allowed text-xs leading-none">▼</button>
      </div>
      <span className="text-terminal-muted">&gt;</span>
      <InlineEdit
        value={task.title}
        onCommit={(title) => updateTask(task.id, title)}
        className={`flex-1 text-sm ${task.isDone ? "line-through text-terminal-muted" : ""}`}
      />
      <ConfirmAction
        triggerLabel="削除"
        message="削除しますか？"
        onConfirm={() => deleteTask(task.id)}
      />
    </div>
  )
}
