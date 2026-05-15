"use client"

import { useState } from "react"
import type { Goal, Task } from "@/types"

type MapGoalNodeProps = {
  goal: Goal
  tasks: Task[]
}

export default function MapGoalNode({ goal, tasks }: MapGoalNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const doneCount = tasks.filter((t) => t.isDone).length
  const isAllDone = tasks.length > 0 && doneCount === tasks.length

  return (
    <div className="ml-4 border-l border-terminal-border pl-3">
      <button
        onClick={() => setIsCollapsed((v) => !v)}
        className="flex items-center gap-2 py-1 w-full text-left hover:opacity-80 transition-opacity"
      >
        <span className="text-terminal-muted text-xs w-4 shrink-0">
          {tasks.length === 0 ? " " : isCollapsed ? "[+]" : "[-]"}
        </span>
        <span className={`text-sm ${isAllDone ? "text-terminal-green" : "text-terminal-text"}`}>
          {goal.title}
        </span>
        {tasks.length > 0 && (
          <span className={`text-xs ml-auto ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
            {doneCount}/{tasks.length}
          </span>
        )}
      </button>

      {!isCollapsed && tasks.map((task) => (
        <div key={task.id} className="ml-6 flex items-center gap-2 py-0.5">
          <span className={`text-xs ${task.isDone ? "text-terminal-green" : "text-terminal-muted"}`}>
            {task.isDone ? "[x]" : "[ ]"}
          </span>
          <span className={`text-xs ${task.isDone ? "text-terminal-muted line-through" : "text-terminal-text"}`}>
            {task.title}
          </span>
        </div>
      ))}
    </div>
  )
}
