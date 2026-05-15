"use client"

import { useState } from "react"
import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"
import type { Vision } from "@/types"

type VisionItemProps = {
  vision: Vision
  goalCount: number
  taskCount: number
  doneCount: number
}

export default function VisionItem({ vision, goalCount, taskCount, doneCount }: VisionItemProps) {
  const [confirming, setConfirming] = useState(false)
  const deleteVision = useVisionStore((s) => s.deleteVision)
  const { goals, deleteGoalsByVisionId } = useGoalStore()
  const { tasks, deleteTasksByGoalId } = useTaskStore()
  const removeTodayTasksByIds = useTodayStore((s) => s.removeTodayTasksByIds)

  const handleDelete = () => {
    const goalIds = goals.filter((g) => g.visionId === vision.id).map((g) => g.id)
    const taskIds = tasks.filter((t) => goalIds.includes(t.goalId)).map((t) => t.id)
    removeTodayTasksByIds(taskIds)
    goalIds.forEach((gid) => deleteTasksByGoalId(gid))
    deleteGoalsByVisionId(vision.id)
    deleteVision(vision.id)
  }

  const isAllDone = taskCount > 0 && doneCount === taskCount
  const progressPercent = taskCount > 0 ? Math.round((doneCount / taskCount) * 100) : 0
  const hasTask = taskCount > 0

  return (
    <div className="py-2 border-b border-terminal-border last:border-0 px-4">
      <div className="flex items-center gap-2">
        <span className="text-terminal-green">&gt;</span>
        <span className="text-terminal-text flex-1">{vision.title}</span>
        <span className="text-terminal-muted text-sm">{goalCount} goals</span>

        {hasTask && (
          <span className={`text-sm ml-2 mr-2 ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
            {doneCount}/{taskCount}
          </span>
        )}
        {!hasTask && (
          <span className="text-terminal-muted text-sm mx-2">---</span>
        )}

        {confirming ? (
          <span className="flex items-center gap-2 text-sm">
            <span className="text-terminal-muted">削除しますか？</span>
            <button onClick={handleDelete} className="text-red-400 hover:text-red-300 transition-colors">
              [はい]
            </button>
            <button onClick={() => setConfirming(false)} className="text-terminal-muted hover:text-terminal-text transition-colors">
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

      {hasTask && (
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
