"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Today", href: "/" },
  { label: "Select", href: "/select" },
  { label: "Tasks", href: "/tasks" },
  { label: "Goals", href: "/goals" },
  { label: "Visions", href: "/visions" },
  { label: "Map", href: "/map" },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-terminal-border px-4 py-3">
      <nav className="max-w-2xl mx-auto flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="text-terminal-green font-bold tracking-wider shrink-0">
          &gt; スグヤル
        </span>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "text-terminal-green"
                  : "text-terminal-muted hover:text-terminal-text transition-colors"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
        <span className="text-terminal-muted text-xs shrink-0 hidden sm:block">? for shortcuts</span>
      </nav>
    </header>
  )
}
