"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTodayStore } from "@/stores/todayStore"
import { useTaskStore } from "@/stores/taskStore"
import TodayItem from "./TodayItem"
import { MAX_TODAY_TASKS } from "@/lib/constants"

export default function TodayList() {
  const getTodayTasks = useTodayStore((s) => s.getTodayTasks)
  const swapTodayTasks = useTodayStore((s) => s.swapTodayTasks)
  const tasks = useTaskStore((s) => s.tasks)
  const [todayLabel, setTodayLabel] = useState("")

  useEffect(() => {
    setTodayLabel(
      new Date().toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    )
  }, [])

  const todayTasks = getTodayTasks()
  const todayItems = todayTasks
    .map((tt) => tasks.find((t) => t.id === tt.taskId))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  const doneItems = todayItems.filter((t) => t.isDone)
  const pendingItems = todayItems.filter((t) => !t.isDone)

  const doneCount = doneItems.length
  const totalCount = todayItems.length
  const progressPercent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-terminal-green">
          &gt; 今日のタスク ({todayItems.length}/{MAX_TODAY_TASKS})
        </p>
        <span className="text-terminal-muted text-xs">{todayLabel}</span>
      </div>

      {todayItems.length === 0 ? (
        <p className="text-terminal-muted text-sm mb-6">
          &gt; 今日のタスクはまだありません。タスクを選びましょう。
        </p>
      ) : (
        <>
          {/* プログレスバー */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-terminal-muted mb-1">
              <span>{doneCount}/{totalCount} 完了</span>
              {doneCount === totalCount && totalCount > 0 && (
                <span className="text-terminal-green">all done.</span>
              )}
            </div>
            <div className="h-px bg-terminal-border w-full">
              <div
                className="h-px bg-terminal-green transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* タスク一覧（未完了が上・完了が下） */}
          <div className="border border-terminal-border mb-6">
            {pendingItems.map((task, idx) => (
              <TodayItem
                key={task.id}
                task={task}
                isPending
                isFirst={idx === 0}
                isLast={idx === pendingItems.length - 1}
                onMoveUp={() => swapTodayTasks(task.id, pendingItems[idx - 1].id)}
                onMoveDown={() => swapTodayTasks(task.id, pendingItems[idx + 1].id)}
              />
            ))}
            {doneItems.map((task) => (
              <TodayItem key={task.id} task={task} />
            ))}
          </div>
        </>
      )}

      <Link
        href="/select"
        className={`inline-block border px-4 py-2 text-sm transition-colors ${
          todayItems.length >= MAX_TODAY_TASKS
            ? "border-terminal-muted text-terminal-muted cursor-not-allowed"
            : "border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg"
        }`}
      >
        + タスクを選ぶ ({todayItems.length}/{MAX_TODAY_TASKS})
      </Link>
    </div>
  )
}
