import TaskForm from "@/components/tasks/TaskForm"
import TaskList from "@/components/tasks/TaskList"

export default function TasksPage() {
  return (
    <div>
      <p className="text-terminal-green mb-6">&gt; タスク管理</p>
      <TaskForm />
      <TaskList />
    </div>
  )
}
