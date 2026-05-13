"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"
import SelectItem from "./SelectItem"

const MAX_TODAY_TASKS = 5

export default function SelectList() {
  const router = useRouter()
  const goals = useGoalStore((s) => s.goals)
  const tasks = useTaskStore((s) => s.tasks)
  const { addTodayTask, removeTodayTask, getTodayTasks } = useTodayStore()

  const todayTaskIds = new Set(getTodayTasks().map((t) => t.taskId))
  const [selected, setSelected] = useState<Set<string>>(new Set(todayTaskIds))

  const incompleteTasks = tasks.filter((t) => !t.isDone)
  const isOverLimit = selected.size >= MAX_TODAY_TASKS

  const handleToggle = (taskId: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(taskId)) {
        next.delete(taskId)
      } else {
        if (next.size >= MAX_TODAY_TASKS) return prev
        next.add(taskId)
      }
      return next
    })
  }

  const handleSubmit = () => {
    for (const taskId of todayTaskIds) {
      if (!selected.has(taskId)) removeTodayTask(taskId)
    }
    for (const taskId of selected) {
      if (!todayTaskIds.has(taskId)) addTodayTask(taskId)
    }
    router.push("/")
  }

  const goalsWithIncompleteTasks = goals.filter(
    (g) => incompleteTasks.filter((t) => t.goalId === g.id).length > 0
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-terminal-green">
          &gt; タスクを選ぶ
        </p>
        <span className={`text-sm ${isOverLimit ? "text-yellow-400" : "text-terminal-muted"}`}>
          {selected.size}/{MAX_TODAY_TASKS} 選択中
          {isOverLimit && " — 上限"}
        </span>
      </div>

      {incompleteTasks.length === 0 ? (
        <p className="text-terminal-muted text-sm">
          &gt; 未完了のタスクはありません。タスクを作成しましょう。
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {goalsWithIncompleteTasks.map((goal) => (
              <div key={goal.id} className="border border-terminal-border">
                <div className="px-4 py-2 border-b border-terminal-border bg-terminal-border">
                  <span className="text-terminal-green text-sm">[{goal.title}]</span>
                </div>
                {incompleteTasks
                  .filter((t) => t.goalId === goal.id)
                  .map((task) => (
                    <SelectItem
                      key={task.id}
                      task={task}
                      isSelected={selected.has(task.id)}
                      isDisabled={isOverLimit}
                      onToggle={handleToggle}
                    />
                  ))}
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full border border-terminal-green text-terminal-green py-2 text-sm hover:bg-terminal-green hover:text-terminal-bg transition-colors"
          >
            追加する
          </button>
        </>
      )}
    </div>
  )
}
