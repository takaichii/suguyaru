import VisionForm from "@/components/visions/VisionForm"
import VisionList from "@/components/visions/VisionList"

export default function VisionsPage() {
  return (
    <div>
      <div className="mb-6 font-mono">
        <p className="text-terminal-muted text-xs">$ ls ./visions</p>
        <p className="text-terminal-green text-sm mt-1">&gt; Visions</p>
      </div>
      <VisionForm />
      <VisionList />
    </div>
  )
}
