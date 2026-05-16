"use client"

import { useState } from "react"

type ConfirmActionProps = {
  triggerLabel: string
  message: string
  onConfirm: () => void
}

export default function ConfirmAction({ triggerLabel, message, onConfirm }: ConfirmActionProps) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <span className="flex items-center gap-2 text-sm">
        <span className="text-terminal-muted">{message}</span>
        <button
          onClick={() => { onConfirm(); setConfirming(false) }}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          [はい]
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-terminal-muted hover:text-terminal-text transition-colors"
        >
          [いいえ]
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-terminal-muted text-sm hover:text-red-400 transition-colors"
    >
      [{triggerLabel}]
    </button>
  )
}
