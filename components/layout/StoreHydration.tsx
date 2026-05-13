"use client"

import { useEffect } from "react"
import { useGoalStore } from "@/stores/goalStore"
import { useTaskStore } from "@/stores/taskStore"
import { useTodayStore } from "@/stores/todayStore"

export default function StoreHydration() {
  useEffect(() => {
    useGoalStore.persist.rehydrate()
    useTaskStore.persist.rehydrate()
    useTodayStore.persist.rehydrate()
  }, [])
  return null
}
