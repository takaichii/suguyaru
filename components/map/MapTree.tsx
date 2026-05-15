"use client"

import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import MapVisionNode from "./MapVisionNode"

export default function MapTree() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)

  if (visions.length === 0 && goals.length === 0) {
    return (
      <p className="text-terminal-muted text-sm">
        &gt; まだデータがありません。Vision・Goal・Task を作成しましょう。
      </p>
    )
  }

  const unclassifiedGoals = goals.filter((g) => !g.visionId)

  return (
    <div className="space-y-4">
      {visions.map((vision) => (
        <MapVisionNode
          key={vision.id}
          vision={vision}
          goals={goals.filter((g) => g.visionId === vision.id)}
          tasks={tasks}
        />
      ))}

      {unclassifiedGoals.length > 0 && (
        <MapVisionNode
          vision={null}
          goals={unclassifiedGoals}
          tasks={tasks}
        />
      )}
    </div>
  )
}
