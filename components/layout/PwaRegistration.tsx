"use client"

import { useEffect } from "react"

export default function PwaRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {}) // 登録失敗はサイレントに無視
    }
  }, [])

  return null
}
