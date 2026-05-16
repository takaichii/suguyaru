"use client"

import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"

export function useDeleteGoal() {
  const deleteGoal = useGoalStore((s) => s.deleteGoal)
  const { tasks, deleteTasksByGoalId } = useTaskStore()
  const removeTodayTasksByIds = useTodayStore((s) => s.removeTodayTasksByIds)

  return (goalId: string) => {
    const taskIds = tasks.filter((t) => t.goalId === goalId).map((t) => t.id)
    removeTodayTasksByIds(taskIds)
    deleteTasksByGoalId(goalId)
    deleteGoal(goalId)
  }
}
