"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TaskSortOrder = 'goal' | 'created' | 'dueDate'

interface UiStore {
  showCompletedTasks: boolean
  toggleShowCompletedTasks: () => void
  collapsedVisionIds: string[]
  collapsedGoalIds: string[]
  toggleVisionCollapsed: (visionId: string) => void
  toggleGoalCollapsed: (goalId: string) => void
  taskSortOrder: TaskSortOrder
  setTaskSortOrder: (order: TaskSortOrder) => void
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      showCompletedTasks: true,
      toggleShowCompletedTasks: () =>
        set((state) => ({ showCompletedTasks: !state.showCompletedTasks })),
      collapsedVisionIds: [],
      collapsedGoalIds: [],
      toggleVisionCollapsed: (visionId) =>
        set((state) => ({
          collapsedVisionIds: state.collapsedVisionIds.includes(visionId)
            ? state.collapsedVisionIds.filter((id) => id !== visionId)
            : [...state.collapsedVisionIds, visionId],
        })),
      toggleGoalCollapsed: (goalId) =>
        set((state) => ({
          collapsedGoalIds: state.collapsedGoalIds.includes(goalId)
            ? state.collapsedGoalIds.filter((id) => id !== goalId)
            : [...state.collapsedGoalIds, goalId],
        })),
      taskSortOrder: 'goal',
      setTaskSortOrder: (order) => set({ taskSortOrder: order }),
    }),
    { name: "suguyaru-ui", skipHydration: true }
  )
)
