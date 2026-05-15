"use client"

import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import GoalItem from "./GoalItem"

export default function GoalList() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)

  if (goals.length === 0) {
    return (
      <p className="text-terminal-muted text-sm">
        &gt; まだ Goal がありません。最初の Goal を作成しましょう。
      </p>
    )
  }

  const visionsWithGoals = visions.filter((v) =>
    goals.some((g) => g.visionId === v.id)
  )
  const unclassifiedGoals = goals.filter((g) => !g.visionId)

  return (
    <div className="space-y-4">
      {visionsWithGoals.map((vision) => (
        <div key={vision.id} className="border border-terminal-border">
          <div className="px-4 py-2 border-b border-terminal-border bg-terminal-border">
            <span className="text-terminal-green text-xs">Vision: </span>
            <span className="text-terminal-text text-sm">{vision.title}</span>
          </div>
          {goals
            .filter((g) => g.visionId === vision.id)
            .map((goal) => {
              const goalTasks = tasks.filter((t) => t.goalId === goal.id)
              return (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  taskCount={goalTasks.length}
                  doneCount={goalTasks.filter((t) => t.isDone).length}
                />
              )
            })}
        </div>
      ))}

      {unclassifiedGoals.length > 0 && (
        <div className="border border-terminal-border">
          <div className="px-4 py-2 border-b border-terminal-border bg-terminal-border">
            <span className="text-terminal-muted text-sm">未分類</span>
          </div>
          {unclassifiedGoals.map((goal) => {
            const goalTasks = tasks.filter((t) => t.goalId === goal.id)
            return (
              <GoalItem
                key={goal.id}
                goal={goal}
                taskCount={goalTasks.length}
                doneCount={goalTasks.filter((t) => t.isDone).length}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
