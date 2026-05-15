"use client"

import { useState } from "react"
import type { Vision, Goal, Task } from "@/types"
import MapGoalNode from "./MapGoalNode"

const BAR_WIDTH = 24

function AsciiBar({ done, total }: { done: number; total: number }) {
  const filled = total > 0 ? Math.round((done / total) * BAR_WIDTH) : 0
  const isAllDone = total > 0 && done === total
  return (
    <span className={`text-xs tracking-tight ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
      {"█".repeat(filled)}{"░".repeat(BAR_WIDTH - filled)}
    </span>
  )
}

type MapVisionNodeProps = {
  vision: Vision | null
  goals: Goal[]
  tasks: Task[]
}

export default function MapVisionNode({ vision, goals, tasks }: MapVisionNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const visionTasks = tasks.filter((t) => goals.some((g) => g.id === t.goalId))
  const doneCount = visionTasks.filter((t) => t.isDone).length
  const isAllDone = visionTasks.length > 0 && doneCount === visionTasks.length
  const percent = visionTasks.length > 0
    ? Math.round((doneCount / visionTasks.length) * 100)
    : 0

  return (
    <div className="border border-terminal-border font-mono">
      {/* Vision ヘッダー */}
      <button
        onClick={() => setIsCollapsed((v) => !v)}
        className="w-full px-4 py-3 bg-terminal-border hover:opacity-80 transition-opacity text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-terminal-muted text-xs shrink-0">{isCollapsed ? "▶" : "▼"}</span>
          {vision ? (
            <>
              <span className="text-terminal-green text-xs font-bold tracking-widest shrink-0">
                VISION
              </span>
              <span className="text-terminal-text text-sm flex-1">{vision.title}</span>
            </>
          ) : (
            <span className="text-terminal-muted text-sm flex-1 italic">// 未分類</span>
          )}
          {visionTasks.length > 0 && (
            <span className={`text-xs shrink-0 ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
              {percent}%
            </span>
          )}
        </div>

        {visionTasks.length > 0 && (
          <div className="flex items-center gap-3 mt-2 ml-5">
            <AsciiBar done={doneCount} total={visionTasks.length} />
            <span className={`text-xs ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
              {doneCount}/{visionTasks.length}
            </span>
            {isAllDone && (
              <span className="text-terminal-green text-xs tracking-widest">ALL DONE</span>
            )}
          </div>
        )}
      </button>

      {/* Goal リスト */}
      {!isCollapsed && (
        <div className="px-4 py-3 space-y-0.5">
          {goals.length === 0 ? (
            <p className="text-terminal-muted text-xs ml-4">// Goal なし</p>
          ) : (
            goals.map((goal, i) => (
              <MapGoalNode
                key={goal.id}
                goal={goal}
                tasks={tasks.filter((t) => t.goalId === goal.id)}
                isLast={i === goals.length - 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
