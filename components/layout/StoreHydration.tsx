"use client"

import { useEffect } from "react"
import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"
import { useUiStore } from "@/stores/uiStore"

export default function StoreHydration() {
  useEffect(() => {
    useVisionStore.persist.rehydrate()
    useGoalStore.persist.rehydrate()
    useTaskStore.persist.rehydrate()
    useTodayStore.persist.rehydrate()
    useUiStore.persist.rehydrate()
  }, [])
  return null
}
