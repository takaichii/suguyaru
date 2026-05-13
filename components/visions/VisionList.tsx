"use client"

import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import VisionItem from "./VisionItem"

export default function VisionList() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)

  if (visions.length === 0) {
    return (
      <p className="text-terminal-muted text-sm">
        &gt; まだ Vision がありません。最初の Vision を作成しましょう。
      </p>
    )
  }

  return (
    <div className="border border-terminal-border">
      {visions.map((vision) => (
        <VisionItem
          key={vision.id}
          vision={vision}
          goalCount={goals.filter((g) => g.visionId === vision.id).length}
        />
      ))}
    </div>
  )
}
