"use client"

import { useState } from "react"
import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useUiStore } from "@/stores/uiStore"
import TaskItem from "./TaskItem"

export default function TaskList() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)
  const { showCompletedTasks, toggleShowCompletedTasks, collapsedGoalIds, toggleGoalCollapsed, taskSortOrder, setTaskSortOrder } = useUiStore()
  const [searchQuery, setSearchQuery] = useState("")

  if (tasks.length === 0) {
    return (
      <p className="text-terminal-muted text-sm">
        &gt; まだタスクがありません。タスクを作成しましょう。
      </p>
    )
  }

  const query = searchQuery.trim().toLowerCase()
  const baseTasks = (showCompletedTasks ? tasks : tasks.filter((t) => !t.isDone))
    .filter((t) => !query || t.title.toLowerCase().includes(query))

  const sortedTasks = [...baseTasks].sort((a, b) => {
    if (taskSortOrder === 'dueDate') {
      const ad = (a as { dueDate?: string }).dueDate
      const bd = (b as { dueDate?: string }).dueDate
      if (!ad && !bd) return 0
      if (!ad) return 1
      if (!bd) return -1
      return ad.localeCompare(bd)
    }
    return 0
  })
  const visibleTasks = taskSortOrder === 'goal' ? baseTasks : sortedTasks
  const goalsWithTasks = goals.filter((g) => visibleTasks.some((t) => t.goalId === g.id))

  const getVisionLabel = (visionId?: string) => {
    if (!visionId) return null
    return visions.find((v) => v.id === visionId)?.title ?? null
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center border border-terminal-border focus-within:border-terminal-green transition-colors">
          <span className="text-terminal-muted text-xs px-2 shrink-0">&gt;</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="タスクを検索..."
            className="flex-1 bg-transparent text-terminal-text placeholder-terminal-muted text-sm py-1 pr-2 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-terminal-muted hover:text-terminal-text text-xs px-2 shrink-0"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {(["goal", "created", "dueDate"] as const).map((o) => (
            <button
              key={o}
              onClick={() => setTaskSortOrder(o)}
              className={`text-xs px-1.5 py-0.5 border transition-colors ${
                taskSortOrder === o
                  ? "border-terminal-green text-terminal-green"
                  : "border-terminal-border text-terminal-muted hover:border-terminal-text hover:text-terminal-text"
              }`}
            >
              {o === "goal" ? "Goal" : o === "created" ? "新着" : "期限"}
            </button>
          ))}
        </div>
        <button
          onClick={toggleShowCompletedTasks}
          className="text-terminal-muted text-xs hover:text-terminal-text transition-colors shrink-0"
        >
          [{showCompletedTasks ? "完了済みを非表示" : "完了済みを表示"}]
        </button>
      </div>

      {goalsWithTasks.length === 0 ? (
        <p className="text-terminal-muted text-sm">
          {query
            ? `> "${searchQuery}" に一致するタスクはありません。`
            : "> 未完了のタスクはありません。"}
        </p>
      ) : taskSortOrder !== 'goal' ? (
        <div className="border border-terminal-border">
          {visibleTasks.map((task) => {
            const goal = goals.find((g) => g.id === task.goalId)
            return (
              <div key={task.id} className="border-b border-terminal-border last:border-0">
                {goal && (
                  <div className="px-4 pt-1.5 pb-0.5">
                    <span className="text-terminal-muted text-xs">{goal.title}</span>
                  </div>
                )}
                <TaskItem task={task} />
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {goalsWithTasks.map((goal) => {
            const visionLabel = getVisionLabel(goal.visionId)
            const isCollapsed = collapsedGoalIds.includes(goal.id)
            const goalTasks = visibleTasks.filter((t) => t.goalId === goal.id)
            return (
              <div key={goal.id} className="border border-terminal-border">
                <button
                  onClick={() => toggleGoalCollapsed(goal.id)}
                  className="w-full flex items-center gap-2 px-4 py-2 border-b border-terminal-border bg-terminal-border hover:opacity-80 transition-opacity text-left"
                >
                  <span className="text-terminal-muted text-xs w-4 shrink-0">
                    {isCollapsed ? "[+]" : "[-]"}
                  </span>
                  {visionLabel && (
                    <span className="text-terminal-muted text-xs">{visionLabel} &gt; </span>
                  )}
                  <span className="text-terminal-green text-sm flex-1">{goal.title}</span>
                  <span className="text-terminal-muted text-xs">{goalTasks.length} tasks</span>
                </button>
                {!isCollapsed && goalTasks.map((task) => (
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
