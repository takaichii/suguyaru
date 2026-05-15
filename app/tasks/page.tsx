import TaskForm from "@/components/tasks/TaskForm"
import TaskList from "@/components/tasks/TaskList"
import BulkDeleteCompletedButton from "@/components/tasks/BulkDeleteCompletedButton"

export default function TasksPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-terminal-green">&gt; Tasks</p>
        <BulkDeleteCompletedButton />
      </div>
      <TaskForm />
      <TaskList />
    </div>
  )
}
