"use client"

import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useUiStore } from "@/stores/uiStore"
import GoalItem from "./GoalItem"

function renderGoals(goalList: ReturnType<typeof useGoalStore.getState>["goals"], tasks: ReturnType<typeof useTaskStore.getState>["tasks"], swapGoals: (a: string, b: string) => void) {
  return goalList.map((goal, idx) => {
    const goalTasks = tasks.filter((t) => t.goalId === goal.id)
    return (
      <GoalItem
        key={goal.id}
        goal={goal}
        taskCount={goalTasks.length}
        doneCount={goalTasks.filter((t) => t.isDone).length}
        isFirst={idx === 0}
        isLast={idx === goalList.length - 1}
        onMoveUp={() => swapGoals(goal.id, goalList[idx - 1].id)}
        onMoveDown={() => swapGoals(goal.id, goalList[idx + 1].id)}
      />
    )
  })
}

export default function GoalList() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)
  const swapGoals = useGoalStore((s) => s.swapGoals)
  const tasks = useTaskStore((s) => s.tasks)
  const { collapsedVisionIds, toggleVisionCollapsed } = useUiStore()

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
      {visionsWithGoals.map((vision) => {
        const isCollapsed = collapsedVisionIds.includes(vision.id)
        const visionGoals = goals.filter((g) => g.visionId === vision.id)
        return (
          <div key={vision.id} className="border border-terminal-border">
            <button
              onClick={() => toggleVisionCollapsed(vision.id)}
              className="w-full flex items-center gap-2 px-4 py-2 border-b border-terminal-border bg-terminal-border hover:opacity-80 transition-opacity text-left"
            >
              <span className="text-terminal-muted text-xs w-4 shrink-0">
                {isCollapsed ? "[+]" : "[-]"}
              </span>
              <span className="text-terminal-green text-xs">Vision: </span>
              <span className="text-terminal-text text-sm flex-1">{vision.title}</span>
              <span className="text-terminal-muted text-xs">{visionGoals.length} goals</span>
            </button>
            {!isCollapsed && renderGoals(visionGoals, tasks, swapGoals)}
          </div>
        )
      })}

      {unclassifiedGoals.length > 0 && (
        <div className="border border-terminal-border">
          <div className="px-4 py-2 border-b border-terminal-border bg-terminal-border">
            <span className="text-terminal-muted text-sm">未分類</span>
          </div>
          {renderGoals(unclassifiedGoals, tasks, swapGoals)}
        </div>
      )}
    </div>
  )
}
