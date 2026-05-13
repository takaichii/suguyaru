"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TodayTask } from "@/types"

interface TodayStore {
  todayTasks: TodayTask[]
  addTodayTask: (taskId: string) => void
  removeTodayTask: (taskId: string) => void
  removeTodayTasksByIds: (taskIds: string[]) => void
  getTodayTasks: () => TodayTask[]
}

const today = () => new Date().toISOString().slice(0, 10)

export const useTodayStore = create<TodayStore>()(
  persist(
    (set, get) => ({
      todayTasks: [],
      addTodayTask: (taskId) =>
        set((state) => ({
          todayTasks: [...state.todayTasks, { taskId, date: today() }],
        })),
      removeTodayTask: (taskId) =>
        set((state) => ({
          todayTasks: state.todayTasks.filter(
            (t) => !(t.taskId === taskId && t.date === today())
          ),
        })),
      removeTodayTasksByIds: (taskIds) =>
        set((state) => ({
          todayTasks: state.todayTasks.filter((t) => !taskIds.includes(t.taskId)),
        })),
      getTodayTasks: () =>
        get().todayTasks.filter((t) => t.date === today()),
    }),
    { name: "suguyaru-today" }
  )
)
