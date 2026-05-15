"use client"

import { useState } from "react"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"
import type { Goal } from "@/types"

type GoalItemProps = {
  goal: Goal
  taskCount: number
  doneCount: number
}

export default function GoalItem({ goal, taskCount, doneCount }: GoalItemProps) {
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

  const isAllDone = taskCount > 0 && doneCount === taskCount
  const progressPercent = taskCount > 0 ? Math.round((doneCount / taskCount) * 100) : 0

  return (
    <div className="py-2 border-b border-terminal-border last:border-0 px-4">
      <div className="flex items-center gap-2">
        <span className="text-terminal-green">&gt;</span>
        <span className="text-terminal-text flex-1">{goal.title}</span>
        <span className={`text-sm mr-4 ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
          {doneCount}/{taskCount}
        </span>

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

      {taskCount > 0 && (
        <div className="mt-1.5 ml-4 h-1 bg-terminal-border rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${isAllDone ? "bg-terminal-green" : "bg-terminal-muted"}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  )
}
