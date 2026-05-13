"use client"

import { useEffect, useRef, useState } from "react"
import { useVisionStore } from "@/stores/visionStore"
import { useGoalStore } from "@/stores/goalStore"

export default function GoalForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState("")
  const [visionId, setVisionId] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")
  const visions = useVisionStore((s) => s.visions)
  const addGoal = useGoalStore((s) => s.addGoal)

  const selectedVision = visions.find((v) => v.id === visionId)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectVision = (id: string) => {
    setVisionId(id)
    setIsOpen(false)
    if (error) setError("")
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setError("> Goal 名を入力してください")
      inputRef.current?.focus()
      return
    }
    setError("")
    addGoal(trimmed, visionId || undefined)
    setTitle("")
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      {/* Vision 選択（任意） */}
      {visions.length > 0 && (
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm border transition-colors text-left ${
              isOpen
                ? "border-terminal-green text-terminal-text"
                : "border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-text"
            }`}
          >
            <span>
              {selectedVision ? (
                <>
                  <span className="text-terminal-muted mr-2">Vision:</span>
                  <span className="text-terminal-green">{selectedVision.title}</span>
                </>
              ) : (
                "> Vision を選択...（任意）"
              )}
            </span>
            <span className={`text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full border border-terminal-green bg-terminal-bg mt-px">
              <button
                type="button"
                onClick={() => handleSelectVision("")}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-terminal-muted hover:bg-terminal-green hover:text-terminal-bg transition-colors"
              >
                <span>&gt;</span> 未分類
                {!visionId && <span className="ml-auto text-xs">✓</span>}
              </button>
              {visions.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleSelectVision(v.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors hover:bg-terminal-green hover:text-terminal-bg ${
                    v.id === visionId ? "text-terminal-green" : "text-terminal-text"
                  }`}
                >
                  <span className="text-terminal-muted">&gt;</span>
                  {v.title}
                  {v.id === visionId && <span className="ml-auto text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Goal 名 + 追加ボタン */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError("")
          }}
          placeholder="Goal 名を入力..."
          maxLength={100}
          className={`flex-1 bg-transparent border text-terminal-text placeholder-terminal-muted px-3 py-2 text-sm focus:outline-none transition-colors ${
            error ? "border-red-400" : "border-terminal-border focus:border-terminal-green"
          }`}
        />
        <button
          type="submit"
          className="text-terminal-green border border-terminal-green px-4 py-2 text-sm hover:bg-terminal-green hover:text-terminal-bg transition-colors"
        >
          + 追加
        </button>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </form>
  )
}
