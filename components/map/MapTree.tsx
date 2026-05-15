"use client"

import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import MapVisionNode from "./MapVisionNode"

const BAR_WIDTH = 32

function AsciiBar({ done, total }: { done: number; total: number }) {
  const filled = total > 0 ? Math.round((done / total) * BAR_WIDTH) : 0
  const isAllDone = total > 0 && done === total
  return (
    <span className={`text-xs tracking-tight ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
      {"█".repeat(filled)}{"░".repeat(BAR_WIDTH - filled)}
    </span>
  )
}

export default function MapTree() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)

  const doneTasks = tasks.filter((t) => t.isDone).length
  const isAllDone = tasks.length > 0 && doneTasks === tasks.length
  const percent = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0
  const unclassifiedGoals = goals.filter((g) => !g.visionId)

  if (visions.length === 0 && goals.length === 0) {
    return (
      <div className="font-mono border border-terminal-border px-4 py-6 text-center space-y-2">
        <p className="text-terminal-muted text-xs">$ tree --status</p>
        <p className="text-terminal-muted text-xs">0 visions, 0 goals, 0 tasks</p>
        <p className="text-terminal-muted text-xs mt-2">
          Vision・Goal・Task を作成するとここに表示されます。
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 font-mono">
      {/* OVERVIEW パネル */}
      <div className="border border-terminal-border">
        <div className="px-4 py-1.5 border-b border-terminal-border bg-terminal-border flex items-center gap-3">
          <span className="text-terminal-green text-xs tracking-widest">OVERVIEW</span>
          <span className="text-terminal-muted text-xs ml-auto">
            {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}
          </span>
        </div>
        <div className="px-4 py-3 space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-terminal-muted">
            <span>
              <span className="text-terminal-text">{visions.length}</span> visions
            </span>
            <span className="text-terminal-border select-none">·</span>
            <span>
              <span className="text-terminal-text">{goals.length}</span> goals
            </span>
            <span className="text-terminal-border select-none">·</span>
            <span>
              <span className="text-terminal-text">{tasks.length}</span> tasks
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <AsciiBar done={doneTasks} total={tasks.length} />
            <span className={`text-xs ${isAllDone ? "text-terminal-green" : "text-terminal-muted"}`}>
              {doneTasks}/{tasks.length} done ({percent}%)
            </span>
            {isAllDone && tasks.length > 0 && (
              <span className="text-terminal-green text-xs tracking-widest">ALL DONE</span>
            )}
          </div>
        </div>
      </div>

      {/* Vision ノード */}
      {visions.map((vision) => (
        <MapVisionNode
          key={vision.id}
          vision={vision}
          goals={goals.filter((g) => g.visionId === vision.id)}
          tasks={tasks}
        />
      ))}

      {unclassifiedGoals.length > 0 && (
        <MapVisionNode
          vision={null}
          goals={unclassifiedGoals}
          tasks={tasks}
        />
      )}
    </div>
  )
}
