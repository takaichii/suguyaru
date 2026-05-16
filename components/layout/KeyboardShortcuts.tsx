"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

const SHORTCUTS = [
  { key: "[N]", desc: "Goal / Task 入力欄にフォーカス" },
  { key: "[Space]", desc: "Today: 最初の未完了タスクをチェック" },
  { key: "[?]", desc: "このヘルプを表示 / 閉じる" },
  { key: "[Esc]", desc: "閉じる" },
]

export default function KeyboardShortcuts() {
  const pathname = usePathname()
  const [showHelp, setShowHelp] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      )
        return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      if (e.key === "?" || e.key === "/") {
        setShowHelp((v) => !v)
        return
      }

      if (e.key === "Escape") {
        if (showHelp) setShowHelp(false)
        return
      }

      if (e.key === "n" || e.key === "N") {
        if (pathname === "/goals") {
          const input = document.querySelector<HTMLInputElement>(
            'input[placeholder="Goal 名を入力..."]'
          )
          input?.focus()
          input?.select()
        } else if (pathname === "/tasks") {
          const input = document.querySelector<HTMLInputElement>(
            'input[placeholder="タスク名を入力..."]'
          )
          input?.focus()
          input?.select()
        }
        return
      }

      if (e.key === " ") {
        if (pathname === "/") {
          e.preventDefault()
          const checkbox = document.querySelector<HTMLInputElement>(
            'input[type="checkbox"]:not(:checked)'
          )
          checkbox?.click()
        }
      }
    },
    [pathname, showHelp]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (!showHelp) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={() => setShowHelp(false)}
    >
      <div
        className="border border-terminal-green bg-terminal-bg p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-terminal-green text-sm mb-4">&gt; keyboard shortcuts</p>
        <div className="space-y-3">
          {SHORTCUTS.map(({ key, desc }) => (
            <div key={key} className="flex gap-4 text-sm">
              <span className="text-terminal-green font-mono w-20 shrink-0">{key}</span>
              <span className="text-terminal-muted">{desc}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowHelp(false)}
          className="mt-5 text-terminal-muted text-xs hover:text-terminal-text transition-colors"
        >
          [閉じる]
        </button>
      </div>
    </div>
  )
}
