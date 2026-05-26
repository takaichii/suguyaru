"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Goal } from "@/types"

interface GoalStore {
  goals: Goal[]
  addGoal: (title: string, visionId?: string) => void
  updateGoal: (goalId: string, title: string) => void
  deleteGoal: (goalId: string) => void
  deleteGoalsByVisionId: (visionId: string) => void
  swapGoals: (goalId1: string, goalId2: string) => void
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (title, visionId) =>
        set((state) => ({
          goals: [...state.goals, { id: crypto.randomUUID(), title, visionId }],
        })),
      updateGoal: (goalId, title) =>
        set((state) => ({
          goals: state.goals.map((g) => g.id === goalId ? { ...g, title } : g),
        })),
      deleteGoal: (goalId) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== goalId),
        })),
      deleteGoalsByVisionId: (visionId) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.visionId !== visionId),
        })),
      swapGoals: (goalId1, goalId2) =>
        set((state) => {
          const idx1 = state.goals.findIndex((g) => g.id === goalId1)
          const idx2 = state.goals.findIndex((g) => g.id === goalId2)
          if (idx1 === -1 || idx2 === -1) return state
          const newGoals = [...state.goals]
          ;[newGoals[idx1], newGoals[idx2]] = [newGoals[idx2], newGoals[idx1]]
          return { goals: newGoals }
        }),
    }),
    { name: "suguyaru-goals", skipHydration: true }
  )
)
