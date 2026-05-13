"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Today", href: "/" },
  { label: "Select", href: "/select" },
  { label: "Tasks", href: "/tasks" },
  { label: "Goals", href: "/goals" },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-terminal-border px-4 py-3">
      <nav className="max-w-2xl mx-auto flex items-center gap-6">
        <span className="text-terminal-green font-bold tracking-wider">
          &gt; スグヤル
        </span>
        <div className="flex gap-4 text-sm">
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
      </nav>
    </header>
  )
}
