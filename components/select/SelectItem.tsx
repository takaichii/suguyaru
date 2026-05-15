"use client"

import type { Task } from "@/types"

type SelectItemProps = {
  task: Task
  isSelected: boolean
  isDisabled: boolean
  onToggle: (taskId: string) => void
}

export default function SelectItem({
  task,
  isSelected,
  isDisabled,
  onToggle,
}: SelectItemProps) {
  return (
    <label
      className={`flex items-center gap-3 py-2 pl-4 border-b border-terminal-border last:border-0 cursor-pointer ${
        isDisabled && !isSelected ? "opacity-40 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        disabled={isDisabled && !isSelected}
        onChange={() => onToggle(task.id)}
        className="accent-terminal-green"
      />
      <span className="text-terminal-text text-sm">{task.title}</span>
    </label>
  )
}
