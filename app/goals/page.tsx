import GoalForm from "@/components/goals/GoalForm"
import GoalList from "@/components/goals/GoalList"

export default function GoalsPage() {
  return (
    <div>
      <div className="mb-6 font-mono">
        <p className="text-terminal-muted text-xs">$ tree --status ./goals</p>
        <p className="text-terminal-green text-sm mt-1">&gt; Goals</p>
      </div>
      <GoalForm />
      <GoalList />
    </div>
  )
}
