"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Task } from "@/types"

interface TaskStore {
  tasks: Task[]
  addTask: (title: string, goalId: string) => void
  toggleTaskDone: (taskId: string) => void
  deleteTask: (taskId: string) => void
  deleteTasksByGoalId: (goalId: string) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, goalId) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: crypto.randomUUID(), title, goalId, isDone: false },
          ],
        })),
      toggleTaskDone: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, isDone: !t.isDone } : t
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),
      deleteTasksByGoalId: (goalId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.goalId !== goalId),
        })),
    }),
    { name: "suguyaru-tasks", skipHydration: true }
  )
)
