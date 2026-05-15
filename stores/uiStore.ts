"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UiStore {
  showCompletedTasks: boolean
  toggleShowCompletedTasks: () => void
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      showCompletedTasks: true,
      toggleShowCompletedTasks: () =>
        set((state) => ({ showCompletedTasks: !state.showCompletedTasks })),
    }),
    { name: "suguyaru-ui", skipHydration: true }
  )
)
