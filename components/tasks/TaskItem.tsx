import type { Task } from "@/types"

type TaskItemProps = {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-terminal-border last:border-0 pl-4">
      <span className="text-terminal-muted">&gt;</span>
      <span
        className={
          task.isDone
            ? "line-through text-terminal-muted text-sm"
            : "text-terminal-text text-sm"
        }
      >
        {task.title}
      </span>
    </div>
  )
}
