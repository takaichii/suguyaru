"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Goal } from "@/types"

interface GoalStore {
  goals: Goal[]
  addGoal: (title: string) => void
  deleteGoal: (goalId: string) => void
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (title) =>
        set((state) => ({
          goals: [...state.goals, { id: crypto.randomUUID(), title }],
        })),
      deleteGoal: (goalId) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== goalId),
        })),
    }),
    { name: "suguyaru-goals" }
  )
)
