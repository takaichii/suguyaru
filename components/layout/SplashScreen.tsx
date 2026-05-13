"use client"

import { useEffect, useState } from "react"

const LINES = [
  { text: "> スグヤル v0.1.0", color: "text-terminal-green", bold: true },
  { text: "> initializing system...", color: "text-terminal-muted", bold: false },
  { text: "> loading local data...    [OK]", color: "text-terminal-muted", bold: false },
  { text: "> syncing task store...    [OK]", color: "text-terminal-muted", bold: false },
  { text: "> 未来を、今の行動に。", color: "text-terminal-green", bold: false },
]

const LINE_INTERVAL = 380
const HOLD_DURATION = 900
const FADE_DURATION = 600

export default function SplashScreen() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [fading, setFading] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * LINE_INTERVAL + 100))
    })

    const totalTime = LINES.length * LINE_INTERVAL + HOLD_DURATION
    timers.push(setTimeout(() => setFading(true), totalTime))
    timers.push(setTimeout(() => setDismissed(true), totalTime + FADE_DURATION))

    return () => timers.forEach(clearTimeout)
  }, [])

  const skip = () => {
    setFading(true)
    setTimeout(() => setDismissed(true), FADE_DURATION)
  }

  if (dismissed) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-terminal-bg flex items-center justify-center cursor-pointer"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease`,
      }}
      onClick={skip}
    >
      <div className="w-full max-w-md px-8 space-y-3">
        {LINES.map((line, i) => (
          <p
            key={i}
            className={`text-sm ${line.color} ${line.bold ? "font-bold" : ""}`}
            style={{
              opacity: i < visibleCount ? 1 : 0,
              transform: i < visibleCount ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 250ms ease, transform 250ms ease",
            }}
          >
            {line.text}
          </p>
        ))}

        {visibleCount >= LINES.length && (
          <p
            className="text-terminal-muted text-xs pt-4 animate-pulse"
            style={{ opacity: fading ? 0 : 1 }}
          >
            _ tap to continue
          </p>
        )}
      </div>
    </div>
  )
}
