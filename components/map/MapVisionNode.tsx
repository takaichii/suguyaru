"use client"

import { useState } from "react"
import type { Vision, Goal, Task } from "@/types"
import MapGoalNode from "./MapGoalNode"

type MapVisionNodeProps = {
  vision: Vision | null
  goals: Goal[]
  tasks: Task[]
}

export default function MapVisionNode({ vision, goals, tasks }: MapVisionNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const totalTasks = tasks.filter((t) => goals.some((g) => g.id === t.goalId))
  const doneTasks = totalTasks.filter((t) => t.isDone)
  const isAllDone = totalTasks.length > 0 && doneTasks.length === totalTasks.length
  const progressPercent = totalTasks.length > 0
    ? Math.round((doneTasks.length / totalTasks.length) * 100)
    : 0

  return (
    <div className="border border-terminal-border">
      <button
        onClick={() => setIsCollapsed((v) => !v)}
        className="w-full flex items-center gap-2 px-4 py-2 border-b border-terminal-border bg-terminal-border hover:opacity-80 transition-opacity text-left"
      >
        <span className="text-terminal-muted text-xs w-4 shrink-0">
          {isCollapsed ? "[+]" : "[-]"}
        </span>
        {vision ? (
          <>
            <span className="text-terminal-green text-xs">Vision: </span>
            <span className="text-terminal-text text-sm flex-1">{vision.title}</span>
          </>
        ) : (
          <span className="text-terminal-muted text-sm flex-1">未分類</span>
        )}
        {totalTasks.length > 0 && (
          <span className={`text-xs ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
            {progressPercent}%
          </span>
        )}
      </button>

      {!isCollapsed && (
        <div className="px-4 py-2 space-y-1">
          {goals.length === 0 ? (
            <p className="text-terminal-muted text-xs ml-4">Goal がありません</p>
          ) : (
            goals.map((goal) => (
              <MapGoalNode
                key={goal.id}
                goal={goal}
                tasks={tasks.filter((t) => t.goalId === goal.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
