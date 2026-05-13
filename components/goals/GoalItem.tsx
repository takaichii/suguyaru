"use client"

import { useState } from "react"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"
import type { Goal } from "@/types"

type GoalItemProps = {
  goal: Goal
  taskCount: number
}

export default function GoalItem({ goal, taskCount }: GoalItemProps) {
  const [confirming, setConfirming] = useState(false)
  const deleteGoal = useGoalStore((s) => s.deleteGoal)
  const { tasks, deleteTasksByGoalId } = useTaskStore()
  const removeTodayTasksByIds = useTodayStore((s) => s.removeTodayTasksByIds)

  const handleDelete = () => {
    const taskIds = tasks.filter((t) => t.goalId === goal.id).map((t) => t.id)
    removeTodayTasksByIds(taskIds)
    deleteTasksByGoalId(goal.id)
    deleteGoal(goal.id)
  }

  return (
    <div className="flex items-center gap-2 py-2 border-b border-terminal-border last:border-0 px-4">
      <span className="text-terminal-green">&gt;</span>
      <span className="text-terminal-text flex-1">{goal.title}</span>
      <span className="text-terminal-muted text-sm mr-4">{taskCount} tasks</span>

      {confirming ? (
        <span className="flex items-center gap-2 text-sm">
          <span className="text-terminal-muted">削除しますか？</span>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            [はい]
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="text-terminal-muted hover:text-terminal-text transition-colors"
          >
            [いいえ]
          </button>
        </span>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="text-terminal-muted text-sm hover:text-red-400 transition-colors"
        >
          [削除]
        </button>
      )}
    </div>
  )
}
