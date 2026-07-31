import Icon from '../components/ui/Icon'

export default function Settings() {
  return (
    <div className="min-h-screen bg-background p-4 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-[28px] bg-white/90 border border-outline-variant p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Application Settings</p>
              <h1 className="text-3xl font-semibold text-on-surface">Preferences & Security</h1>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-surface-container px-5 py-3 text-sm text-on-surface-variant">
              <Icon name="security" /> Settings area coming soon
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {['Account Privacy', 'Notification Preferences', 'Language & Theme'].map((item) => (
              <div key={item} className="rounded-3xl bg-surface-container p-6 border border-outline-variant shadow-sm">
                <p className="text-sm font-semibold text-on-surface">{item}</p>
                <p className="mt-3 text-sm text-on-surface-variant">This feature will be available in a future release as part of our premium roadmap.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
