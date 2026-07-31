import { Link } from 'react-router-dom'
import Icon from './ui/Icon'

export default function Navbar() {
  return (
    <div className="w-full bg-surface/90 backdrop-blur-xl border-b border-outline-variant py-4 px-6 hidden lg:flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-xl font-semibold text-primary">HealthPilot AI</Link>
        <div className="rounded-full bg-surface-container px-4 py-2 text-sm text-on-surface-variant">White | Blue | Teal theme</div>
      </div>
      <div className="flex items-center gap-4 text-sm text-on-surface-variant">
        <button className="flex items-center gap-2 rounded-2xl bg-surface-container px-4 py-2 hover:bg-surface-container-high transition-colors">
          <Icon name="language" />
          English
        </button>
        <button className="flex items-center gap-2 rounded-2xl bg-surface-container px-4 py-2 hover:bg-surface-container-high transition-colors">
          <Icon name="palette" />
          Theme
        </button>
      </div>
    </div>
  )
}
