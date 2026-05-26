"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Task } from "@/types"

interface TaskStore {
  tasks: Task[]
  addTask: (title: string, goalId: string) => void
  updateTask: (taskId: string, title: string) => void
  toggleTaskDone: (taskId: string) => void
  deleteTask: (taskId: string) => void
  deleteTasksByGoalId: (goalId: string) => void
  deleteCompletedTasks: () => string[]
  swapTasks: (taskId1: string, taskId2: string) => void
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
      updateTask: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((t) => t.id === taskId ? { ...t, title } : t),
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
      deleteCompletedTasks: () => {
        let deletedIds: string[] = []
        set((state) => {
          deletedIds = state.tasks.filter((t) => t.isDone).map((t) => t.id)
          return { tasks: state.tasks.filter((t) => !t.isDone) }
        })
        return deletedIds
      },
      swapTasks: (taskId1, taskId2) =>
        set((state) => {
          const idx1 = state.tasks.findIndex((t) => t.id === taskId1)
          const idx2 = state.tasks.findIndex((t) => t.id === taskId2)
          if (idx1 === -1 || idx2 === -1) return state
          const newTasks = [...state.tasks]
          ;[newTasks[idx1], newTasks[idx2]] = [newTasks[idx2], newTasks[idx1]]
          return { tasks: newTasks }
        }),
    }),
    { name: "suguyaru-tasks", skipHydration: true }
  )
)
