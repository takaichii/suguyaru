import GoalForm from "@/components/goals/GoalForm"
import GoalList from "@/components/goals/GoalList"

export default function GoalsPage() {
  return (
    <div>
      <p className="text-terminal-green mb-6">&gt; Goal 管理</p>
      <GoalForm />
      <GoalList />
    </div>
  )
}
