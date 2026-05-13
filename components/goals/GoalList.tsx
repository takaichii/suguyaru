"use client"

import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import GoalItem from "./GoalItem"

export default function GoalList() {
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)

  if (goals.length === 0) {
    return (
      <p className="text-terminal-muted text-sm">
        &gt; まだ Goal がありません。最初の Goal を作成しましょう。
      </p>
    )
  }

  return (
    <div className="border border-terminal-border">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          taskCount={tasks.filter((t) => t.goalId === goal.id).length}
        />
      ))}
    </div>
  )
}
