"use client"

import { useState } from "react"
import { useTaskStore } from "@/stores/taskStore"
import type { Goal, Task } from "@/types"

type MapGoalNodeProps = {
  goal: Goal
  tasks: Task[]
  isLast: boolean
}

export default function MapGoalNode({ goal, tasks, isLast }: MapGoalNodeProps) {
  const toggleTaskDone = useTaskStore((s) => s.toggleTaskDone)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const doneCount = tasks.filter((t) => t.isDone).length
  const isAllDone = tasks.length > 0 && doneCount === tasks.length
  const hasTasks = tasks.length > 0

  const branchChar = isLast ? "└─" : "├─"
  const childIndent = isLast ? "   " : "│  "

  return (
    <div className="font-mono">
      <button
        onClick={() => hasTasks && setIsCollapsed((v) => !v)}
        className={`flex items-center gap-2 py-1 w-full text-left ${hasTasks ? "hover:opacity-80 transition-opacity" : ""}`}
      >
        <span className="text-terminal-muted text-xs shrink-0">{branchChar}</span>
        <span className={`text-xs shrink-0 ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
          {isAllDone ? "●" : "○"}
        </span>
        <span className={`text-sm flex-1 ${isAllDone ? "text-terminal-green" : "text-terminal-text"}`}>
          {goal.title}
        </span>
        {hasTasks && (
          <span className={`text-xs shrink-0 ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
            [{doneCount}/{tasks.length}]
          </span>
        )}
        {isAllDone && (
          <span className="text-terminal-green text-xs shrink-0 tracking-widest ml-1">DONE</span>
        )}
        {hasTasks && (
          <span className="text-terminal-muted text-xs shrink-0 ml-1 w-3">
            {isCollapsed ? "▶" : "▼"}
          </span>
        )}
      </button>

      {!isCollapsed && tasks.map((task, i) => {
        const isLastTask = i === tasks.length - 1
        return (
          <button
            key={task.id}
            onClick={() => toggleTaskDone(task.id)}
            className="flex items-center gap-2 py-0.5 w-full text-left group"
          >
            <span className="text-terminal-muted text-xs shrink-0 select-none">
              {childIndent}{isLastTask ? "└──" : "├──"}
            </span>
            <span className={`text-xs shrink-0 transition-colors ${task.isDone ? "text-terminal-green" : "text-terminal-muted group-hover:text-terminal-green"}`}>
              {task.isDone ? "[x]" : "[ ]"}
            </span>
            <span className={`text-xs transition-colors ${task.isDone ? "text-terminal-muted line-through" : "text-terminal-text group-hover:text-terminal-green"}`}>
              {task.title}
            </span>
          </button>
        )
      })}
    </div>
  )
}
