import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../components/ui/Icon'

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch } = useForm()

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })
      toast.success('Account created successfully!')
      navigate('/complete-profile')
    } catch {
      toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden py-12">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] opacity-20 rounded-full bg-primary-container blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[520px]">
        <div className="bg-surface-container-lowest p-8 lg:p-12 rounded-xl shadow-xl border border-outline-variant/20">
          <header className="mb-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-4">
              <Icon name="health_and_safety" className="text-white text-3xl" />
            </div>
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-2">Join HealthAI</p>
            <h1 className="text-3xl font-bold text-on-surface">Create Your Account</h1>
            <p className="text-on-surface-variant mt-2">Start your personalized healthcare journey today.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-on-surface-variant ml-1">Full Name</label>
              <div className="relative group">
                <Icon name="person" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary" />
                <input
                  {...register('name', { required: true })}
                  placeholder="Alex Johnson"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-on-surface-variant ml-1">Email Address</label>
              <div className="relative group">
                <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary" />
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-on-surface-variant ml-1">Phone Number</label>
              <div className="relative group">
                <Icon name="phone" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary" />
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-on-surface-variant ml-1">Password</label>
              <div className="relative group">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary" />
                <input
                  {...register('password', { required: true, minLength: 6 })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-surface-container border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-on-surface-variant ml-1">Confirm Password</label>
              <div className="relative group">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary" />
                <input
                  {...register('confirmPassword', { required: true, validate: (v) => v === watch('password') })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-container border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="terms" required className="w-4 h-4 accent-primary rounded mt-0.5" />
              <label htmlFor="terms" className="text-sm text-on-surface-variant">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-on-primary font-semibold rounded-lg shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <Icon name="arrow_forward" />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
            <p className="text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
