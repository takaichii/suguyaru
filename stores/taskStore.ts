"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Task } from "@/types"

interface TaskStore {
  tasks: Task[]
  addTask: (title: string, goalId: string, priority?: Task["priority"]) => void
  updateTask: (taskId: string, title: string) => void
  updateTaskPriority: (taskId: string, priority: Task["priority"]) => void
  toggleTaskDone: (taskId: string) => void
  deleteTask: (taskId: string) => void
  deleteTasksByGoalId: (goalId: string) => void
  deleteCompletedTasks: () => string[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, goalId, priority) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: crypto.randomUUID(), title, goalId, isDone: false, ...(priority ? { priority } : {}) },
          ],
        })),
      updateTask: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((t) => t.id === taskId ? { ...t, title } : t),
        })),
      updateTaskPriority: (taskId, priority) =>
        set((state) => ({
          tasks: state.tasks.map((t) => t.id === taskId ? { ...t, priority } : t),
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
    }),
    { name: "suguyaru-tasks", skipHydration: true }
  )
)
