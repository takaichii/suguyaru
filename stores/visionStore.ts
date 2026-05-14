"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Vision } from "@/types"

interface VisionStore {
  visions: Vision[]
  addVision: (title: string) => void
  deleteVision: (visionId: string) => void
}

export const useVisionStore = create<VisionStore>()(
  persist(
    (set) => ({
      visions: [],
      addVision: (title) =>
        set((state) => ({
          visions: [...state.visions, { id: crypto.randomUUID(), title }],
        })),
      deleteVision: (visionId) =>
        set((state) => ({
          visions: state.visions.filter((v) => v.id !== visionId),
        })),
    }),
    { name: "suguyaru-visions", skipHydration: true }
  )
)
