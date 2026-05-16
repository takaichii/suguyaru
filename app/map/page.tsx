import MapTree from "@/components/map/MapTree"

export default function MapPage() {
  return (
    <div>
      <div className="mb-6 font-mono">
        <p className="text-terminal-muted text-xs">$ tree --status ./visions</p>
        <p className="text-terminal-green text-sm mt-1">&gt; Map</p>
      </div>
      <MapTree />
    </div>
  )
}
