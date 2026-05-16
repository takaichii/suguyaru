"use client"

import { useDeleteVision } from "@/hooks/useDeleteVision"
import ConfirmAction from "@/components/ui/ConfirmAction"
import type { Vision } from "@/types"

type VisionItemProps = {
  vision: Vision
  goalCount: number
  taskCount: number
  doneCount: number
}

export default function VisionItem({ vision, goalCount, taskCount, doneCount }: VisionItemProps) {
  const deleteVision = useDeleteVision()

  const isAllDone = taskCount > 0 && doneCount === taskCount
  const progressPercent = taskCount > 0 ? Math.round((doneCount / taskCount) * 100) : 0
  const hasTask = taskCount > 0

  return (
    <div className="py-2 border-b border-terminal-border last:border-0 px-4">
      <div className="flex items-center gap-2">
        <span className="text-terminal-green">&gt;</span>
        <span className="text-terminal-text flex-1">{vision.title}</span>
        <span className="text-terminal-muted text-sm">{goalCount} goals</span>

        {hasTask ? (
          <span className={`text-sm ml-2 mr-2 ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
            {doneCount}/{taskCount}
          </span>
        ) : (
          <span className="text-terminal-muted text-sm mx-2">---</span>
        )}

        <ConfirmAction
          triggerLabel="削除"
          message="削除しますか？"
          onConfirm={() => deleteVision(vision.id)}
        />
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
