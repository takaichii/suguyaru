"use client"

import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"

export function useDeleteTask() {
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const removeTodayTasksByIds = useTodayStore((s) => s.removeTodayTasksByIds)

  return (taskId: string) => {
    removeTodayTasksByIds([taskId])
    deleteTask(taskId)
  }
}
