import { useState, useEffect } from 'react'
import { timelineAPI } from '../services/api'
import Icon from '../components/ui/Icon'

const DEMO_EVENTS = [
  { id: 1, date: '2026-07-31', time: '08:00', type: 'symptom', title: 'AI Symptom Check', description: 'Mild headache assessment — tension-related cluster identified', icon: 'clinical_notes', color: 'secondary' },
  { id: 2, date: '2026-07-30', time: '14:30', type: 'report', title: 'Blood Test Uploaded', description: 'Cholesterol borderline high, Vitamin D low — follow-up recommended', icon: 'upload_file', color: 'primary' },
  { id: 3, date: '2026-07-28', time: '09:30', type: 'appointment', title: 'Cardiology Check-up', description: 'Dr. Sarah Jenkins — Routine heart health monitoring', icon: 'calendar_today', color: 'primary' },
  { id: 4, date: '2026-07-25', time: '08:00', type: 'medication', title: 'Medicine Reminder Started', description: 'Metformin 500mg daily regimen initiated', icon: 'medication', color: 'secondary' },
  { id: 5, date: '2026-07-20', time: '11:00', type: 'report', title: 'Prescription Analysis', description: 'Lisinopril 10mg — no interactions detected', icon: 'description', color: 'primary' },
  { id: 6, date: '2026-07-15', time: '16:00', type: 'appointment', title: 'General Consultation', description: 'Dr. Michael Chen — Annual wellness check', icon: 'medical_services', color: 'secondary' },
]

const filters = ['All', 'Symptoms', 'Reports', 'Appointments', 'Medication']

export default function HealthTimeline() {
  const [events, setEvents] = useState(DEMO_EVENTS)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    timelineAPI.list()
      .then(({ data }) => setEvents(data))
      .catch(() => {})
  }, [])

  const filtered = activeFilter === 'All'
    ? events
    : events.filter((e) => e.type === activeFilter.toLowerCase().slice(0, -1) || e.type === activeFilter.toLowerCase())

  const grouped = filtered.reduce((acc, event) => {
    const date = event.date
    if (!acc[date]) acc[date] = []
    acc[date].push(event)
    return acc
  }, {})

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  return (
    <div className="p-4 lg:p-12 max-w-[1440px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-[2px] bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Health History</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Health Timeline</h1>
        <p className="text-on-surface-variant">Your complete health journey in one chronological view.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeFilter === f
                ? 'bg-primary text-on-primary shadow-md'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([date, dayEvents]) => (
          <div key={date}>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-semibold text-on-surface">{formatDate(date)}</h2>
              <div className="flex-1 h-px bg-outline-variant" />
              <span className="text-xs text-on-surface-variant">{dayEvents.length} events</span>
            </div>

            <div className="relative pl-8 space-y-4">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-outline-variant" />

              {dayEvents.map((event) => (
                <div key={event.id} className="relative flex gap-4">
                  <div className={`absolute -left-5 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                    event.color === 'primary' ? 'bg-primary-container' : 'bg-secondary-container'
                  }`}>
                    <Icon name={event.icon} className="text-white text-sm" />
                  </div>

                  <div className="flex-1 bg-surface rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 ml-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold mb-1">{event.title}</p>
                        <p className="text-sm text-on-surface-variant">{event.description}</p>
                      </div>
                      <span className="text-xs text-on-surface-variant whitespace-nowrap">{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
