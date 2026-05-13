import type { Goal } from "@/types"

type GoalItemProps = {
  goal: Goal
  taskCount: number
}

export default function GoalItem({ goal, taskCount }: GoalItemProps) {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-terminal-border last:border-0">
      <span className="text-terminal-green">&gt;</span>
      <span className="text-terminal-text flex-1">{goal.title}</span>
      <span className="text-terminal-muted text-sm">{taskCount} tasks</span>
    </div>
  )
}
