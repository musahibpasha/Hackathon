import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Icon from '../ui/Icon'

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/profile', icon: 'person', label: 'Health Profile' },
  { path: '/symptom-checker', icon: 'clinical_notes', label: 'Symptom Checker' },
  { path: '/doctor-recommendation', icon: 'medical_services', label: 'Doctor Recommendation' },
  { path: '/book-appointment', icon: 'calendar_today', label: 'Book Appointment' },
  { path: '/appointments', icon: 'history_edu', label: 'Appointment History' },
  { path: '/health-timeline', icon: 'timeline', label: 'Health Timeline' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const { logout } = useAuth()

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-on-surface/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-[280px] bg-surface-container-low border-r border-outline-variant z-50 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="px-6 h-20 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center">
            <Icon name="health_and_safety" className="text-on-primary text-xl" />
          </div>
          <span className="text-xl font-semibold text-primary">HealthPilot AI</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map(({ path, icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
                  isActive
                    ? 'bg-primary-container text-white shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <Icon name={icon} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface py-3 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <Icon name="logout" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
