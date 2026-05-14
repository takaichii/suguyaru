"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Goal } from "@/types"

interface GoalStore {
  goals: Goal[]
  addGoal: (title: string, visionId?: string) => void
  deleteGoal: (goalId: string) => void
  deleteGoalsByVisionId: (visionId: string) => void
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (title, visionId) =>
        set((state) => ({
          goals: [...state.goals, { id: crypto.randomUUID(), title, visionId }],
        })),
      deleteGoal: (goalId) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== goalId),
        })),
      deleteGoalsByVisionId: (visionId) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.visionId !== visionId),
        })),
    }),
    { name: "suguyaru-goals", skipHydration: true }
  )
)
