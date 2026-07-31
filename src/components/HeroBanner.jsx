import { Link } from 'react-router-dom'
import Icon from './ui/Icon'

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-primary text-white py-20">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.35),_transparent_40%)]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.25),_transparent_30%)]" />
      <div className="relative max-w-6xl mx-auto px-4 lg:px-12 grid gap-10 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80">
            <Icon name="bolt" /> Premium Healthcare
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">HealthPilot AI — Intelligent care for every patient.</h1>
          <p className="max-w-xl text-lg text-white/80">A fully designed healthcare dashboard with onboarding, symptom analysis, doctors, and appointments built for a polished MVP experience.</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link to="/register" className="rounded-3xl bg-secondary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-colors">
              Start Your Profile
            </Link>
            <Link to="/login" className="rounded-3xl border border-white/20 px-8 py-4 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors">
              Log In
            </Link>
          </div>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 gap-6">
            {['Complete onboarding', 'Analyze symptoms', 'Book doctors', 'Track your health'].map((item) => (
              <div key={item} className="rounded-3xl bg-white/10 p-6 border border-white/10">
                <p className="text-sm text-white/80">{item}</p>
                <div className="mt-3 h-1 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
