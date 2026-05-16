"use client"

import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"

export function useDeleteVision() {
  const deleteVision = useVisionStore((s) => s.deleteVision)
  const { goals, deleteGoalsByVisionId } = useGoalStore()
  const { tasks, deleteTasksByGoalId } = useTaskStore()
  const removeTodayTasksByIds = useTodayStore((s) => s.removeTodayTasksByIds)

  return (visionId: string) => {
    const goalIds = goals.filter((g) => g.visionId === visionId).map((g) => g.id)
    const taskIds = tasks.filter((t) => goalIds.includes(t.goalId)).map((t) => t.id)
    removeTodayTasksByIds(taskIds)
    goalIds.forEach((gid) => deleteTasksByGoalId(gid))
    deleteGoalsByVisionId(visionId)
    deleteVision(visionId)
  }
}
