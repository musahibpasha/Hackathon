import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { languages, initialHealthProfile } from '../lib/dummyData'
import useVoiceInput from '../hooks/useVoiceInput'

const STEPS = [
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'Medical Details' },
  { id: 3, label: 'Review' },
]

export default function CompleteHealthProfile() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState(initialHealthProfile)
  const { language, listening, transcript, startListening, setLanguage } = useVoiceInput('English')
  const { register, handleSubmit, watch, setValue } = useForm({ defaultValues: profile })

  const watchHeight = watch('height')
  const watchWeight = watch('weight')
  const bmi = useMemo(() => {
    const heightM = Number(watchHeight) / 100
    const weightKg = Number(watchWeight)
    if (!heightM || !weightKg) return ''
    return (weightKg / (heightM * heightM)).toFixed(1)
  }, [watchHeight, watchWeight])

  const applyVoiceInput = () => {
    const sample = transcript
    if (!sample) return
    setValue('allergies', sample)
  }

  const onSubmit = (formData) => {
    const fullData = { ...profile, ...formData, bmi }
    setProfile(fullData)
    if (step < 3) {
      setStep((s) => s + 1)
      return
    }
    localStorage.setItem('healthProfile', JSON.stringify(fullData))
    navigate('/dashboard')
  }

  const editStep = (target) => {
    setStep(target)
  }

  return (
    <div className="min-h-screen bg-background text-on-surface px-4 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="bg-white/90 backdrop-blur-xl border border-outline-variant rounded-[28px] shadow-2xl overflow-hidden"
        >
          <div className="bg-primary text-white px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary-container font-semibold mb-3">
                  Complete Health Profile
                </p>
                <h1 className="text-4xl font-bold leading-tight">
                  Premium onboarding for your HealthPilot AI experience.
                </h1>
                <p className="mt-4 max-w-2xl text-base text-primary-container/90">
                  Finish these steps once to unlock your tailored dashboard, AI symptom analysis, and doctor recommendations.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 border border-white/10 shadow-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-primary-container mb-2">Selected Language</p>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang} className="text-on-surface">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {STEPS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => editStep(item.id)}
                  className={`w-full rounded-3xl border px-5 py-4 text-left transition-all ${
                    step === item.id ? 'border-primary bg-primary/10 text-primary shadow-lg' : 'border-outline-variant bg-surface'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] mb-2 text-on-surface-variant">Step {item.id}</p>
                  <h2 className="text-lg font-semibold">{item.label}</h2>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Full Name</label>
                        <input {...register('fullName')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Age</label>
                        <input type="number" {...register('age')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Gender</label>
                        <select {...register('gender')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                          <option value="">Select gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Non-binary">Non-binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Date of Birth</label>
                        <input type="date" {...register('dob')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Phone Number</label>
                        <div className="relative">
                          <input {...register('phone')} placeholder="+91 12345 67890" className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 pr-14" />
                          <button type="button" onClick={startListening} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary/10 p-3 text-primary hover:bg-primary/20 transition-colors">
                            <Icon name="keyboard_voice" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Email</label>
                        <input type="email" {...register('email')} placeholder="name@example.com" className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-outline-variant bg-surface-container p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-on-surface-variant mb-4">Accessibility</p>
                      <div className="rounded-3xl bg-white/80 border border-outline-variant p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`w-12 h-12 rounded-2xl grid place-items-center bg-primary/10 text-primary ${listening ? 'animate-pulse' : ''}`}>
                            <Icon name="mic" />
                          </span>
                          <div>
                            <p className="font-semibold">Voice input ready</p>
                            <p className="text-sm text-on-surface-variant">Tap to capture data through speech.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-3xl border border-outline-variant bg-surface px-4 py-3">
                          <span className="flex-1 text-sm text-on-surface-variant">{listening ? 'Listening…' : transcript || 'Voice field placeholder'}</span>
                          <button type="button" onClick={startListening} className="rounded-2xl bg-primary text-white px-4 py-2 text-sm">
                            {listening ? 'Stop' : 'Speak'}
                          </button>
                        </div>
                        <div className="mt-4 h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                          <div className={`h-full bg-primary transition-all ${listening ? 'w-3/4 animate-pulse' : 'w-0'}`} />
                        </div>
                        <p className="mt-3 text-xs text-on-surface-variant">Language: {language}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Blood Group</label>
                        <select {...register('bloodGroup')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                          <option value="">Select</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Height (cm)</label>
                        <input type="number" {...register('height')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Weight (kg)</label>
                        <input type="number" {...register('weight')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">BMI (calculated)</label>
                        <input value={bmi} readOnly className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant">Allergies</label>
                      <div className="relative">
                        <textarea {...register('allergies')} rows={3} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 pr-20" />
                        <button type="button" onClick={applyVoiceInput} className="absolute right-4 top-4 rounded-full bg-primary/10 p-3 text-primary hover:bg-primary/20 transition-colors">
                          <Icon name="keyboard_voice" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant">Existing Medical Conditions</label>
                      <textarea {...register('conditions')} rows={3} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant">Current Medications</label>
                      <textarea {...register('medications')} rows={3} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Emergency Contact Name</label>
                        <input {...register('emergencyName')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant">Emergency Contact Number</label>
                        <input {...register('emergencyPhone')} className="w-full rounded-3xl border border-outline-variant bg-surface-container px-4 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                      </div>
                    </div>
                    <div className="rounded-[2rem] border border-outline-variant bg-surface-container p-6">
                      <p className="text-sm uppercase tracking-[0.2em] text-on-surface-variant mb-3">Voice Input Demo</p>
                      <div className="flex gap-3 items-center">
                        <button type="button" onClick={startListening} className="rounded-full bg-primary text-white p-4 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                          <Icon name="mic" />
                        </button>
                        <div>
                          <p className="font-semibold">Voice guided capture</p>
                          <p className="text-xs text-on-surface-variant">Speak to fill one of your medical fields faster.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="rounded-[28px] border border-outline-variant bg-surface-container p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Review your details</p>
                        <h2 className="text-3xl font-semibold">Everything looks great.</h2>
                      </div>
                      <button type="button" onClick={() => editStep(1)} className="text-primary font-semibold hover:underline">
                        Edit Information
                      </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {Object.entries({
                        'Full Name': watch('fullName'),
                        Age: watch('age'),
                        Gender: watch('gender'),
                        'Date of Birth': watch('dob'),
                        'Phone Number': watch('phone'),
                        Email: watch('email'),
                        'Blood Group': watch('bloodGroup'),
                        Height: `${watch('height')} cm`,
                        Weight: `${watch('weight')} kg`,
                        BMI: bmi,
                        Allergies: watch('allergies'),
                        Conditions: watch('conditions'),
                        Medications: watch('medications'),
                        'Emergency Contact': `${watch('emergencyName')} • ${watch('emergencyPhone')}`,
                      }).map(([label, value]) => (
                        <div key={label} className="rounded-3xl bg-white/80 border border-outline-variant p-6 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">{label}</p>
                          <p className="text-base font-medium text-on-surface">{value || 'Not provided'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-xs text-on-surface-variant max-w-2xl">
                  This information is for educational purposes only and is not a medical diagnosis. Please consult a qualified healthcare professional.
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  {step > 1 && (
                    <Button type="button" variant="ghost" size="md" onClick={() => setStep(step - 1)} className="w-full sm:w-auto">
                      Back
                    </Button>
                  )}
                  <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                    {step < 3 ? 'Continue' : 'Save & Continue'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
