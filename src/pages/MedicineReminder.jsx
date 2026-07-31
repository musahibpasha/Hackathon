import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { reminderAPI } from '../services/api'
import Icon from '../components/ui/Icon'

const DEMO_REMINDERS = [
  { id: 1, name: 'Metformin', dosage: '500mg', time: '08:00', frequency: 'Daily', taken: true },
  { id: 2, name: 'Lisinopril', dosage: '10mg', time: '08:00', frequency: 'Daily', taken: true },
  { id: 3, name: 'Vitamin D3', dosage: '1000 IU', time: '12:00', frequency: 'Daily', taken: false },
  { id: 4, name: 'Aspirin', dosage: '81mg', time: '20:00', frequency: 'Daily', taken: false },
]

export default function MedicineReminder() {
  const [reminders, setReminders] = useState(DEMO_REMINDERS)
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    reminderAPI.list()
      .then(({ data }) => setReminders(data))
      .catch(() => {})
  }, [])

  const toggleTaken = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, taken: !r.taken } : r))
    )
  }

  const onAdd = async (data) => {
    try {
      const { data: created } = await reminderAPI.create(data)
      setReminders((prev) => [...prev, created])
    } catch {
      setReminders((prev) => [...prev, { ...data, id: Date.now(), taken: false }])
    }
    toast.success('Reminder added!')
    reset()
    setShowForm(false)
  }

  const onDelete = async (id) => {
    try {
      await reminderAPI.delete(id)
    } catch { /* demo mode */ }
    setReminders((prev) => prev.filter((r) => r.id !== id))
    toast.success('Reminder removed')
  }

  const takenCount = reminders.filter((r) => r.taken).length
  const progress = reminders.length ? Math.round((takenCount / reminders.length) * 100) : 0

  return (
    <div className="p-4 lg:p-12 max-w-[1440px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-secondary" />
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Medication Management</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Medicine Reminder</h1>
          <p className="text-on-surface-variant">Track your daily medications and never miss a dose.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity"
        >
          <Icon name="add" />
          Add Medicine
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          {showForm && (
            <form onSubmit={handleSubmit(onAdd)} className="bg-surface rounded-2xl p-6 shadow-sm border border-primary/20">
              <h3 className="font-semibold mb-4">New Medicine Reminder</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...register('name', { required: true })} placeholder="Medicine name" className="px-4 py-3 bg-surface-container border border-outline-variant rounded-xl outline-none focus:border-primary" />
                <input {...register('dosage', { required: true })} placeholder="Dosage (e.g. 500mg)" className="px-4 py-3 bg-surface-container border border-outline-variant rounded-xl outline-none focus:border-primary" />
                <input {...register('time', { required: true })} type="time" className="px-4 py-3 bg-surface-container border border-outline-variant rounded-xl outline-none focus:border-primary" />
                <select {...register('frequency')} className="px-4 py-3 bg-surface-container border border-outline-variant rounded-xl outline-none focus:border-primary">
                  <option value="Daily">Daily</option>
                  <option value="Twice Daily">Twice Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="As Needed">As Needed</option>
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-semibold">Save Reminder</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-surface-container rounded-lg font-semibold">Cancel</button>
              </div>
            </form>
          )}

          {reminders.length === 0 ? (
            <div className="bg-surface rounded-2xl p-12 text-center">
              <Icon name="medication" className="text-5xl text-outline mb-4" />
              <p className="font-semibold mb-2">No reminders yet</p>
              <p className="text-sm text-on-surface-variant">Add your first medicine reminder to get started.</p>
            </div>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`bg-surface rounded-2xl p-5 shadow-sm flex items-center gap-4 transition-all border-l-4 ${
                  reminder.taken ? 'border-secondary opacity-70' : 'border-primary'
                }`}
              >
                <button
                  onClick={() => toggleTaken(reminder.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    reminder.taken ? 'bg-secondary text-on-secondary' : 'bg-surface-container border-2 border-outline-variant hover:border-primary'
                  }`}
                >
                  {reminder.taken && <Icon name="check" className="text-lg" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-semibold ${reminder.taken ? 'line-through text-on-surface-variant' : ''}`}>
                      {reminder.name}
                    </p>
                    <span className="text-xs bg-surface-container px-2 py-0.5 rounded-full font-medium">{reminder.dosage}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">{reminder.frequency} • {reminder.time}</p>
                </div>

                <button onClick={() => onDelete(reminder.id)} className="p-2 text-outline hover:text-error transition-colors">
                  <Icon name="delete" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-primary rounded-2xl p-6 text-on-primary">
            <h3 className="font-semibold mb-1">Today's Progress</h3>
            <p className="text-4xl font-bold mb-2">{progress}%</p>
            <p className="text-sm opacity-80 mb-4">{takenCount} of {reminders.length} doses taken</p>
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="schedule" className="text-primary" />
              Upcoming Doses
            </h3>
            <div className="space-y-3">
              {reminders.filter((r) => !r.taken).slice(0, 3).map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-surface-container rounded-xl">
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-on-surface-variant">{r.dosage}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{r.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary-container/20 rounded-2xl p-5 border border-secondary-container/30">
            <Icon name="notifications_active" className="text-secondary mb-2" />
            <p className="font-semibold text-sm mb-1">Smart Reminders</p>
            <p className="text-xs text-on-surface-variant">
              Enable browser notifications to get alerts when it's time to take your medicine.
            </p>
            <button className="mt-3 w-full py-2 bg-secondary text-on-secondary rounded-lg text-sm font-semibold">
              Enable Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
