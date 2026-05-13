"use client"

import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import TaskItem from "./TaskItem"

export default function TaskList() {
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)

  const goalsWithTasks = goals.filter(
    (g) => tasks.filter((t) => t.goalId === g.id).length > 0
  )

  if (tasks.length === 0) {
    return (
      <p className="text-terminal-muted text-sm">
        &gt; まだタスクがありません。タスクを作成しましょう。
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {goalsWithTasks.map((goal) => (
        <div key={goal.id} className="border border-terminal-border">
          <div className="px-4 py-2 border-b border-terminal-border bg-terminal-border">
            <span className="text-terminal-green text-sm">[{goal.title}]</span>
          </div>
          {tasks
            .filter((t) => t.goalId === goal.id)
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  )
}
