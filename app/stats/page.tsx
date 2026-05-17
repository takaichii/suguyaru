import StatsView from "@/components/stats/StatsView"

export default function StatsPage() {
  return (
    <div>
      <div className="mb-6 font-mono">
        <p className="text-terminal-muted text-xs">$ tree --status --stats</p>
        <p className="text-terminal-green text-sm mt-1">&gt; Stats</p>
      </div>
      <StatsView />
    </div>
  )
}
