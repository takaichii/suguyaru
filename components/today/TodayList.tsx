"use client"

import Link from "next/link"
import { useTodayStore } from "@/stores/todayStore"
import { useTaskStore } from "@/stores/taskStore"
import TodayItem from "./TodayItem"

const MAX_TODAY_TASKS = 5

export default function TodayList() {
  const getTodayTasks = useTodayStore((s) => s.getTodayTasks)
  const tasks = useTaskStore((s) => s.tasks)

  const todayTasks = getTodayTasks()
  const todayItems = todayTasks
    .map((tt) => tasks.find((t) => t.id === tt.taskId))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-terminal-green">
          &gt; 今日のタスク ({todayItems.length}/{MAX_TODAY_TASKS})
        </p>
        <span className="text-terminal-muted text-xs">{today}</span>
      </div>

      {todayItems.length === 0 ? (
        <p className="text-terminal-muted text-sm mb-6">
          &gt; 今日のタスクはまだありません。タスクを選びましょう。
        </p>
      ) : (
        <div className="border border-terminal-border mb-6">
          {todayItems.map((task) => (
            <TodayItem key={task.id} task={task} />
          ))}
        </div>
      )}

      <Link
        href="/select"
        className="inline-block border border-terminal-green text-terminal-green px-4 py-2 text-sm hover:bg-terminal-green hover:text-terminal-bg transition-colors"
      >
        + タスクを選ぶ
      </Link>
    </div>
  )
}
