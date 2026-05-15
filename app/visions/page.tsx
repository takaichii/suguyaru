import VisionForm from "@/components/visions/VisionForm"
import VisionList from "@/components/visions/VisionList"

export default function VisionsPage() {
  return (
    <div>
      <p className="text-terminal-green mb-6">&gt; Visions</p>
      <VisionForm />
      <VisionList />
    </div>
  )
}
