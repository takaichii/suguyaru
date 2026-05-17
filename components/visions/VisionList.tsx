"use client"

import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import VisionItem from "./VisionItem"

export default function VisionList() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)

  if (visions.length === 0) {
    return (
      <div className="font-mono border border-terminal-border px-4 py-6 text-center space-y-2">
        <p className="text-terminal-muted text-xs">$ ls ./visions</p>
        <p className="text-terminal-muted text-xs">0 visions, 0 goals, 0 tasks</p>
        <p className="text-terminal-muted text-xs mt-2">Vision を作成するとここに表示されます。</p>
      </div>
    )
  }

  return (
    <div className="border border-terminal-border">
      {visions.map((vision) => {
        const visionGoalIds = goals
          .filter((g) => g.visionId === vision.id)
          .map((g) => g.id)
        const visionTasks = tasks.filter((t) => visionGoalIds.includes(t.goalId))
        return (
          <VisionItem
            key={vision.id}
            vision={vision}
            goalCount={visionGoalIds.length}
            taskCount={visionTasks.length}
            doneCount={visionTasks.filter((t) => t.isDone).length}
          />
        )
      })}
    </div>
  )
}
