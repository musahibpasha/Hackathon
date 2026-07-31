import { useAuth } from '../context/AuthContext'
import Icon from '../components/ui/Icon'

const healthStats = [
  { label: 'Blood Type', value: 'O+' },
  { label: 'Height', value: '5\'10"' },
  { label: 'Weight', value: '72 kg' },
  { label: 'Age', value: '32 years' },
]

const emergencyContacts = [
  { name: 'Sarah Johnson', relation: 'Spouse', phone: '+1 (555) 234-5678' },
  { name: 'Dr. Michael Chen', relation: 'Primary Doctor', phone: '+1 (555) 876-5432' },
]

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <div>
      <div className="relative overflow-hidden px-6 lg:px-12 py-12 flex flex-col items-center sm:flex-row sm:items-end gap-8 bg-surface">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-12 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative group z-10">
          <div className="relative w-36 h-36 rounded-full border-4 border-surface shadow-xl overflow-hidden">
            <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-lg cursor-pointer">
              <Icon name="photo_camera" className="text-lg" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 z-10 text-center sm:text-left">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Premium Member</span>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-on-surface-variant flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Icon name="location_on" className="text-primary text-lg" />
              San Francisco, CA • Member since 2021
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity">
              <Icon name="edit" className="text-lg" />
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-2.5 bg-surface-container border border-outline-variant text-on-surface-variant rounded-full font-semibold hover:bg-error-container hover:text-error transition-all"
            >
              <Icon name="logout" className="text-lg" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="hidden xl:flex flex-col p-6 bg-surface-container-highest rounded-2xl shadow-sm border border-outline-variant min-w-[280px] z-10">
          <div className="flex justify-between items-start mb-6">
            <Icon name="cases" className="text-primary text-3xl" />
            <div className="text-right">
              <p className="text-xs text-on-surface-variant uppercase">Health Pass</p>
              <p className="font-semibold text-primary">#{user?.id}-991</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-outline-variant rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-primary rounded-full" />
          </div>
          <p className="text-xs text-on-surface-variant mt-2">Profile Completion: 75%</p>
        </div>
      </div>

      <div className="px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="badge" />
              </div>
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', value: user?.name },
                { label: 'Email Address', value: user?.email },
                { label: 'Phone Number', value: user?.phone },
                { label: 'Patient ID', value: `#${user?.id}` },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">{field.label}</label>
                  <p className="text-lg mt-1">{field.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <Icon name="monitor_heart" />
              </div>
              <h2 className="text-xl font-semibold">Health Statistics</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {healthStats.map((stat) => (
                <div key={stat.label} className="bg-surface-container p-4 rounded-xl text-center">
                  <p className="text-xs text-on-surface-variant uppercase mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <section className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="emergency" className="text-error" />
              Emergency Contacts
            </h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.name} className="flex items-center gap-3 p-3 bg-surface-container rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="person" className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{contact.name}</p>
                    <p className="text-xs text-on-surface-variant">{contact.relation} • {contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary rounded-2xl p-6 text-on-primary">
            <Icon name="shield" className="text-3xl mb-3 opacity-80" />
            <h3 className="font-semibold mb-2">Data Privacy</h3>
            <p className="text-sm opacity-80 mb-4">Your health data is encrypted and stored securely in compliance with HIPAA.</p>
            <button className="w-full py-2.5 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
              Manage Privacy Settings
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
