"use client"

import { useState, useEffect } from "react"
import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"

const BAR_WIDTH = 20

function AsciiBar({ done, total, width = BAR_WIDTH }: { done: number; total: number; width?: number }) {
  const filled = total > 0 ? Math.round((done / total) * width) : 0
  return (
    <span className="text-terminal-green font-mono tracking-tight text-xs">
      {"█".repeat(filled)}{"░".repeat(width - filled)}
    </span>
  )
}

function getDayLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return ["日", "月", "火", "水", "木", "金", "土"][d.getDay()]
}

export default function StatsView() {
  const visions = useVisionStore((s) => s.visions)
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)
  const todayTasks = useTodayStore((s) => s.todayTasks)
  const [todayLabel, setTodayLabel] = useState("")

  useEffect(() => {
    setTodayLabel(new Date().toISOString().slice(0, 10))
  }, [])

  const doneTasks = tasks.filter((t) => t.isDone).length
  const totalTasks = tasks.length
  const doneGoals = goals.filter((g) => {
    const gTasks = tasks.filter((t) => t.goalId === g.id)
    return gTasks.length > 0 && gTasks.every((t) => t.isDone)
  }).length

  // 直近7日のデイリー完了数
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(todayLabel || new Date().toISOString().slice(0, 10))
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })

  const dailyCounts = last7Days.map((date) => {
    const count = todayTasks.filter((tt) => tt.date === date).length
    return { date, count }
  })
  const maxCount = Math.max(...dailyCounts.map((d) => d.count), 1)

  return (
    <div className="space-y-6 font-mono">
      {/* サマリー */}
      <div className="border border-terminal-border">
        <div className="px-4 py-1.5 border-b border-terminal-border bg-terminal-border">
          <span className="text-terminal-green text-xs tracking-widest">SUMMARY</span>
        </div>
        <div className="px-4 py-3 space-y-2 text-sm">
          <div className="flex gap-6 flex-wrap text-terminal-muted">
            <span><span className="text-terminal-text">{visions.length}</span> visions</span>
            <span><span className="text-terminal-text">{goals.length}</span> goals</span>
            <span><span className="text-terminal-text">{totalTasks}</span> tasks</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <AsciiBar done={doneTasks} total={totalTasks} />
            <span className="text-terminal-muted text-xs">
              {doneTasks}/{totalTasks} tasks done ({totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0}%)
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <AsciiBar done={doneGoals} total={goals.length} />
            <span className="text-terminal-muted text-xs">
              {doneGoals}/{goals.length} goals done ({goals.length > 0 ? Math.round((doneGoals / goals.length) * 100) : 0}%)
            </span>
          </div>
        </div>
      </div>

      {/* 直近7日のアクティビティ */}
      <div className="border border-terminal-border">
        <div className="px-4 py-1.5 border-b border-terminal-border bg-terminal-border">
          <span className="text-terminal-green text-xs tracking-widest">LAST 7 DAYS</span>
        </div>
        <div className="px-4 py-3 space-y-1.5">
          {dailyCounts.map(({ date, count }) => {
            const barFilled = Math.round((count / maxCount) * 16)
            const isToday = date === todayLabel
            return (
              <div key={date} className="flex items-center gap-2 text-xs">
                <span className={`w-8 shrink-0 ${isToday ? "text-terminal-green" : "text-terminal-muted"}`}>
                  {getDayLabel(date)}
                </span>
                <span className="text-terminal-muted shrink-0 w-6 text-right">{date.slice(5)}</span>
                <span className="text-terminal-green font-mono tracking-tight">
                  {"█".repeat(barFilled)}{"░".repeat(16 - barFilled)}
                </span>
                <span className={count > 0 ? "text-terminal-text" : "text-terminal-muted"}>{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Vision 別達成率 */}
      {visions.length > 0 && (
        <div className="border border-terminal-border">
          <div className="px-4 py-1.5 border-b border-terminal-border bg-terminal-border">
            <span className="text-terminal-green text-xs tracking-widest">BY VISION</span>
          </div>
          <div className="px-4 py-3 space-y-3">
            {visions.map((vision) => {
              const vGoals = goals.filter((g) => g.visionId === vision.id)
              const vTasks = tasks.filter((t) => vGoals.some((g) => g.id === t.goalId))
              const vDone = vTasks.filter((t) => t.isDone).length
              const pct = vTasks.length > 0 ? Math.round((vDone / vTasks.length) * 100) : 0
              return (
                <div key={vision.id} className="space-y-0.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-terminal-text truncate flex-1 mr-2">{vision.title}</span>
                    <span className="text-terminal-muted shrink-0">{vDone}/{vTasks.length} ({pct}%)</span>
                  </div>
                  <AsciiBar done={vDone} total={vTasks.length} width={BAR_WIDTH} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
