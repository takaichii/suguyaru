import VisionForm from "@/components/visions/VisionForm"
import VisionList from "@/components/visions/VisionList"

export default function VisionsPage() {
  return (
    <div>
      <p className="text-terminal-green mb-6">&gt; Vision 管理</p>
      <VisionForm />
      <VisionList />
    </div>
  )
}
