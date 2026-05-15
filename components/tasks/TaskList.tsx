"use client"

import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useUiStore } from "@/stores/uiStore"
import TaskItem from "./TaskItem"

export default function TaskList() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)
  const { showCompletedTasks, toggleShowCompletedTasks } = useUiStore()

  if (tasks.length === 0) {
    return (
      <p className="text-terminal-muted text-sm">
        &gt; まだタスクがありません。タスクを作成しましょう。
      </p>
    )
  }

  const visibleTasks = showCompletedTasks ? tasks : tasks.filter((t) => !t.isDone)
  const goalsWithTasks = goals.filter((g) => visibleTasks.some((t) => t.goalId === g.id))

  const getVisionLabel = (visionId?: string) => {
    if (!visionId) return null
    return visions.find((v) => v.id === visionId)?.title ?? null
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleShowCompletedTasks}
          className="text-terminal-muted text-xs hover:text-terminal-text transition-colors"
        >
          [{showCompletedTasks ? "完了済みを非表示" : "完了済みを表示"}]
        </button>
      </div>

      {goalsWithTasks.length === 0 ? (
        <p className="text-terminal-muted text-sm">
          &gt; 未完了のタスクはありません。
        </p>
      ) : (
        <div className="space-y-4">
          {goalsWithTasks.map((goal) => {
            const visionLabel = getVisionLabel(goal.visionId)
            return (
              <div key={goal.id} className="border border-terminal-border">
                <div className="px-4 py-2 border-b border-terminal-border bg-terminal-border">
                  {visionLabel && (
                    <span className="text-terminal-muted text-xs">{visionLabel} &gt; </span>
                  )}
                  <span className="text-terminal-green text-sm">{goal.title}</span>
                </div>
                {visibleTasks
                  .filter((t) => t.goalId === goal.id)
                  .map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
