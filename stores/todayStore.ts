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
  cleanupOldTodayTasks: () => void
}

const today = () => new Date().toISOString().slice(0, 10)

const CLEANUP_DAYS = 30

const isOlderThan = (dateStr: string, days: number) => {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return new Date(dateStr) < cutoff
}

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
      cleanupOldTodayTasks: () =>
        set((state) => ({
          todayTasks: state.todayTasks.filter((t) => !isOlderThan(t.date, CLEANUP_DAYS)),
        })),
    }),
    { name: "suguyaru-today", skipHydration: true }
  )
)
