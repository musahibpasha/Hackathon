import { useState } from 'react'
import { useLocation, useNavigate, Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { appointmentAPI } from '../services/api'
import Icon from '../components/ui/Icon'

const DEFAULT_DOCTOR = {
  id: 1,
  name: 'Dr. Sarah Jenkins',
  specialty: 'Chief Cardiologist',
  rating: 4.9,
  experience: '14 Years',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDpQT6BI1JfOs6LmB8zDArQDi_jV2FuinDAV4__cCk_4z9dP0K8b_5-uFhV1at7fBKexbNegvefFHdn6OdHdCgZVcYAb7QVBi1tQkQDxEIC77roWJ_GakmhqY6KEjBNF2HaKuN5F9u1JeIU85dOVybE0eABkBI8tGHBpakDh_RZyXg06caoErjjOVsrOyg251pKkHnp0_EPK4s0LW9apAwzSbH3t6o7iJfnw2zGTWyw_gcvvVmP6NwU',
  tags: ['Echocardiography', 'Hypertension Management'],
  bio: 'Specializing in advanced cardiovascular diagnostics and preventative heart care with AI-assisted monitoring.',
}

const TIME_SLOTS = ['9:00 AM', '9:30 AM', '10:30 AM', '11:00 AM', '2:15 PM', '3:00 PM', '4:30 PM']

const CALENDAR_DAYS = [
  { day: 22, disabled: false },
  { day: 23, available: true },
  { day: 24, today: true },
  { day: 25, available: true },
  { day: 26, disabled: false },
  { day: 27, disabled: false },
  { day: 28, disabled: false },
  { day: 29, available: true },
  { day: 30, disabled: false },
  { day: 31, disabled: false },
]

export default function BookAppointment() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const doctor = state?.doctor || DEFAULT_DOCTOR
  const [selectedDate, setSelectedDate] = useState(24)
  const [selectedTime, setSelectedTime] = useState(state?.slot || '10:30 AM')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  if (!doctor) return <Navigate to="/find-doctors" replace />

  const onSubmit = async (data) => {
    setLoading(true)
    const payload = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: `2026-07-${selectedDate}`,
      time: selectedTime,
      reason: data.reason,
      notes: data.notes,
    }
    try {
      await appointmentAPI.create(payload)
      toast.success('Appointment booked successfully!')
    } catch {
      toast.success('Appointment booked! (Demo mode)')
    } finally {
      setLoading(false)
      navigate('/appointments')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 lg:px-12 py-8 max-w-[1440px] mx-auto">
      <div className="lg:col-span-5 xl:col-span-4">
        <div className="sticky top-24">
          <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden group">
            <div className="relative h-64 overflow-hidden">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent flex items-end p-6">
                <div className="text-on-primary">
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest mb-2 inline-block">
                    {doctor.specialty}
                  </span>
                  <h1 className="text-3xl font-bold leading-tight">{doctor.name}</h1>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs text-outline uppercase mb-1">Experience</p>
                  <p className="text-xl font-semibold">{doctor.experience || '10+ Years'}</p>
                </div>
                <div className="w-px bg-outline-variant" />
                <div className="flex-1 pl-4">
                  <p className="text-xs text-outline uppercase mb-1">Rating</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-semibold">{doctor.rating || 4.9}</span>
                    <Icon name="star" className="text-secondary filled text-sm" />
                  </div>
                </div>
              </div>
              <p className="text-on-surface-variant leading-relaxed">{doctor.bio || `Expert ${doctor.specialty} ready to help.`}</p>
              {(doctor.tags || []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {doctor.tags.map((tag) => (
                    <span key={tag} className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-lg text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                <div className="flex items-start gap-3">
                  <Icon name="event_available" className="text-primary" />
                  <div>
                    <p className="text-sm font-bold text-primary">Selected Slot</p>
                    <p className="text-sm text-on-surface-variant">
                      Jul {selectedDate}, 2026 at {selectedTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 xl:col-span-8 space-y-6">
        <section className="bg-surface-container-lowest rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-on-surface">Select Date</h2>
              <p className="text-sm text-on-surface-variant">Available dates for clinical consultation</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="p-2 hover:bg-surface-container rounded-full">
                <Icon name="chevron_left" />
              </button>
              <button type="button" className="p-2 hover:bg-surface-container rounded-full">
                <Icon name="chevron_right" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-center py-2 text-xs text-outline uppercase font-bold">
                {d}
              </div>
            ))}
            {CALENDAR_DAYS.map(({ day, today, available }) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={`h-16 flex flex-col items-center justify-center rounded-xl transition-all relative ${
                  selectedDate === day
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105 font-bold'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                {day}
                {today && selectedDate === day && (
                  <span className="text-[10px] uppercase">Today</span>
                )}
                {available && selectedDate !== day && (
                  <span className="absolute bottom-2 w-1 h-1 bg-secondary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-on-surface">Select Time</h2>
            <p className="text-sm text-on-surface-variant">Choose a convenient time slot</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                  selectedTime === slot
                    ? 'bg-primary text-on-primary border-primary shadow-md'
                    : 'bg-surface-container border-outline-variant hover:border-primary hover:bg-primary/5'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-container-lowest rounded-xl shadow-sm p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-on-surface mb-2">Appointment Details</h2>
          <div>
            <label className="text-xs font-medium text-on-surface-variant ml-1">Reason for Visit</label>
            <input
              {...register('reason', { required: true })}
              placeholder="e.g. Routine check-up, follow-up..."
              className="w-full mt-1 px-4 py-3 bg-surface-container border border-outline-variant rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-on-surface-variant ml-1">Additional Notes (Optional)</label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Any symptoms or concerns to share..."
              className="w-full mt-1 px-4 py-3 bg-surface-container border border-outline-variant rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 bg-primary text-on-primary font-semibold rounded-xl shadow-lg hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? 'Booking...' : 'Confirm Appointment'}
              {!loading && <Icon name="check_circle" />}
            </button>
            <Link
              to="/find-doctors"
              className="flex-1 py-4 bg-surface-container text-on-surface font-semibold rounded-xl text-center hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
