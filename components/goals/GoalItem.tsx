"use client"

import { useGoalStore } from "@/stores/goalStore"
import { useDeleteGoal } from "@/hooks/useDeleteGoal"
import ConfirmAction from "@/components/ui/ConfirmAction"
import InlineEdit from "@/components/ui/InlineEdit"
import type { Goal } from "@/types"

type GoalItemProps = {
  goal: Goal
  taskCount: number
  doneCount: number
}

export default function GoalItem({ goal, taskCount, doneCount }: GoalItemProps) {
  const updateGoal = useGoalStore((s) => s.updateGoal)
  const deleteGoal = useDeleteGoal()

  const isAllDone = taskCount > 0 && doneCount === taskCount
  const progressPercent = taskCount > 0 ? Math.round((doneCount / taskCount) * 100) : 0

  return (
    <div className="py-2 border-b border-terminal-border last:border-0 px-4">
      <div className="flex items-center gap-2">
        <span className="text-terminal-green">&gt;</span>
        <InlineEdit
          value={goal.title}
          onCommit={(title) => updateGoal(goal.id, title)}
          className="flex-1 text-sm"
        />
        <span className={`text-sm mr-4 ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
          {doneCount}/{taskCount}
        </span>
        <ConfirmAction
          triggerLabel="削除"
          message="削除しますか？"
          onConfirm={() => deleteGoal(goal.id)}
        />
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
