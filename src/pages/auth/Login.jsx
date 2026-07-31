import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import Icon from '../../components/ui/Icon'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await login({ identifier: data.identifier, password: data.password })
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch {
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] opacity-20 rounded-full bg-secondary-container blur-3xl" />
        <div className="absolute bottom-[5%] left-[2%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[85vh] gap-6 items-center max-w-[1440px] mx-auto w-full">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pr-0 lg:pr-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-secondary-container/20 to-transparent rounded-[2rem] -rotate-2 scale-105" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                alt="Healthcare Consultation"
                className="w-full h-auto object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYi9n3V64vHF9Oom_c70_QI-oxZnRkmPOuH_GPNlnujMjsrfyvvkq-oX3h2NPrNUWTjuwAm-BFW6wnRDc8ejDNF8thdDCrmRfkStmvbkN6ZywyGKZHLGP_EShit4tSjF_YHnAraBPpOHlug0cU7EGc8q_oAamx5ddhCTMaXqDlaiWNwzhf_8DNzQzIHXMr4jygY7ZgRTgqgGl3ygfhCw_HHAQAukOH3KUjaN5UopGOM1NyzRvWcIK_"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-surface p-6 rounded-xl shadow-xl hidden xl:block border border-outline-variant/30 backdrop-blur-md bg-surface/90">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center">
                  <Icon name="verified_user" className="text-on-secondary-container" />
                </div>
                <div>
                  <p className="text-xs text-outline uppercase tracking-wider font-medium">Security Status</p>
                  <p className="text-lg font-semibold text-on-surface">HIPAA Compliant</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary max-w-xl leading-tight">
              Your Trusted <br />Partner in Health.
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-secondary" />
              <p className="text-lg text-on-surface-variant">
                Access your patient portal securely from any device.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-[480px] bg-surface-container-lowest p-8 lg:p-12 rounded-xl shadow-xl border border-outline-variant/20 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative">
              <header className="mb-8">
                <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-2">Patient Portal</p>
                <h1 className="text-3xl font-bold text-on-surface">Welcome Back</h1>
                <p className="text-on-surface-variant mt-2">Enter your credentials to manage your care.</p>
              </header>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-on-surface-variant ml-1">Email or Phone Number</label>
                  <div className="relative group">
                    <Icon name="alternate_email" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
                    <input
                      {...register('identifier', { required: true })}
                      type="text"
                      placeholder="name@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-surface-container border border-outline-variant rounded-lg outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-outline/60"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-medium text-on-surface-variant">Password</label>
                    <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot?</a>
                  </div>
                  <div className="relative group">
                    <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
                    <input
                      {...register('password', { required: true })}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 bg-surface-container border border-outline-variant rounded-lg outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-outline/60"
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

                <div className="flex items-center gap-2 px-1">
                  <input type="checkbox" id="remember" className="w-4 h-4 accent-primary rounded cursor-pointer" />
                  <label htmlFor="remember" className="text-sm text-on-surface-variant cursor-pointer">
                    Stay logged in for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-on-primary font-semibold rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Log In to Account
                      <Icon name="arrow_forward" className="text-xl" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-outline-variant/30 text-center">
                <p className="text-on-surface-variant">
                  New to our platform?{' '}
                  <Link to="/register" className="text-primary font-semibold hover:underline ml-1">
                    Create an Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
