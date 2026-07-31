import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Icon from '../ui/Icon'

export default function Header({ onMenuClick }) {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 left-0 lg:left-[280px] right-0 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant z-40 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container rounded-lg"
        >
          <Icon name="menu" />
        </button>

        <div className="relative flex-1 max-w-xl group">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl group-focus-within:text-primary"
          />
          <input
            type="text"
            placeholder="Search medical records, doctors..."
            className="w-full bg-surface-container border border-outline-variant rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <button className="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
          <Icon name="notifications" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface" />
        </button>

          <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-outline-variant">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-on-surface leading-none">{user?.name}</p>
              <p className="text-xs text-on-surface-variant">Patient ID: #{user?.id}</p>
            </div>
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/10"
            />
          </Link>
      </div>
    </header>
  )
}
