"use client"

import { useState, useRef, useEffect } from "react"

type InlineEditProps = {
  value: string
  onCommit: (value: string) => void
  className?: string
}

export default function InlineEdit({ value, onCommit, className = "" }: InlineEditProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) onCommit(trimmed)
    setDraft(trimmed || value)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit()
          if (e.key === "Escape") cancel()
        }}
        onBlur={commit}
        className={`bg-transparent border-b border-terminal-green outline-none text-terminal-text ${className}`}
      />
    )
  }

  return (
    <button
      onClick={() => { setDraft(value); setEditing(true) }}
      className={`text-left hover:text-terminal-green transition-colors group ${className}`}
      title="クリックして編集"
    >
      {value}
      <span className="ml-1 text-terminal-muted opacity-0 group-hover:opacity-100 transition-opacity text-xs">
        [編集]
      </span>
    </button>
  )
}
