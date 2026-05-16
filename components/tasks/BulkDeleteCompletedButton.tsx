"use client"

import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"
import ConfirmAction from "@/components/ui/ConfirmAction"

export default function BulkDeleteCompletedButton() {
  const { tasks, deleteCompletedTasks } = useTaskStore()
  const removeTodayTasksByIds = useTodayStore((s) => s.removeTodayTasksByIds)

  const completedCount = tasks.filter((t) => t.isDone).length

  if (completedCount === 0) return null

  const handleDelete = () => {
    const deletedIds = deleteCompletedTasks()
    removeTodayTasksByIds(deletedIds)
  }

  return (
    <ConfirmAction
      triggerLabel="完了済みをすべて削除"
      message={`${completedCount} 件削除しますか？`}
      onConfirm={handleDelete}
    />
  )
}
