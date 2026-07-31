import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import Card from '../components/ui/Card'
import Icon from '../components/ui/Icon'

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <HeroBanner />
      <div className="max-w-6xl mx-auto px-4 lg:px-12 py-16 grid gap-8 lg:grid-cols-3">
        <Card>
          <div className="flex items-center gap-4 mb-4 text-primary">
            <Icon name="shield" className="text-2xl" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold">Secure Care</p>
              <h3 className="text-xl font-semibold">HIPAA-ready design</h3>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">Protect patient data with modern UX and secure account workflows designed for healthcare teams.</p>
        </Card>
        <Card>
          <div className="flex items-center gap-4 mb-4 text-secondary">
            <Icon name="mobile_friendly" className="text-2xl" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold">Telehealth</p>
              <h3 className="text-xl font-semibold">AI symptom assessment</h3>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">Offer intelligent guidance with a scalable interface and polished experience for every device.</p>
        </Card>
        <Card>
          <div className="flex items-center gap-4 mb-4 text-primary-fixed-dim">
            <Icon name="people" className="text-2xl" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold">Patient-first</p>
              <h3 className="text-xl font-semibold">Smart care navigation</h3>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">Navigate to doctors, appointments and health records with a clean dashboard and intuitive workflows.</p>
        </Card>
      </div>
      <div className="max-w-6xl mx-auto px-4 lg:px-12 pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-semibold mb-4">Ready to explore HealthPilot AI?</h2>
            <p className="text-sm text-on-surface-variant mb-6">Experience a polished healthcare MVP with onboarding, care planning, and AI-powered symptom analysis.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
                Log In
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center rounded-2xl border border-primary px-6 py-4 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
                Create Account
              </Link>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <Icon name="analytics" className="text-3xl text-secondary" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Why choose us</p>
                <h3 className="text-2xl font-semibold">Built for hackathon success</h3>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li className="flex gap-3"><Icon name="check_circle" className="text-secondary" /> Modern dashboard and onboarding.</li>
              <li className="flex gap-3"><Icon name="check_circle" className="text-secondary" /> Reusable components and responsive layout.</li>
              <li className="flex gap-3"><Icon name="check_circle" className="text-secondary" /> AI interface ready for Gemini integration.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
