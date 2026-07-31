import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useNormalizedData from '../hooks/useNormalizedData'
import Timeline from '../components/ui/Timeline'
import { useAuth } from '../context/AuthContext'

function parseLocalRecords() {
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
  const reports = JSON.parse(localStorage.getItem('reports') || '[]')
  const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]')
  const assessments = JSON.parse(localStorage.getItem('assessments') || '[]')
  return { appointments, reports, prescriptions, assessments }
}

function fmtDate(d) {
  try {
    const dt = new Date(d)
    return dt.toLocaleDateString()
  } catch (e) {
    return d
  }
}

export default function PatientHistory() {
  const { user } = useAuth()
  const { diseases = [], precautions = {}, medicines = [], loading } = useNormalizedData()
  const { appointments, reports, prescriptions, assessments } = parseLocalRecords()

  const events = useMemo(() => {
    const ev = []
    // appointments
    appointments.forEach((a) => ev.push({
      date: a.date || a.createdAt || 'Unknown',
      title: `Appointment with ${a.doctor || 'Unknown'}`,
      description: a.notes || `${a.type || 'Consultation'} at ${a.time || '—'}`,
      icon: 'event',
      color: 'bg-primary/10',
    }))

    // reports
    reports.forEach((r) => ev.push({
      date: r.date || r.uploadedAt || 'Unknown',
      title: `Report: ${r.title || 'Lab Report'}`,
      description: r.summary || 'Uploaded medical report',
      icon: 'insert_drive_file',
      color: 'bg-secondary/10',
    }))

    // prescriptions
    prescriptions.forEach((p) => ev.push({
      date: p.date || p.issuedAt || 'Unknown',
      title: `Prescription: ${p.doctor || 'Provider'}`,
      description: (p.meds || []).map((m) => m.name).join(', ') || p.notes || 'Prescription issued',
      icon: 'medical_services',
      color: 'bg-green-100',
    }))

    // AI-derived sample events from dataset (if none)
    // saved AI assessments
    assessments.forEach((a) => ev.push({
      date: a.date || new Date().toISOString(),
      title: `AI Assessment — ${a.severity || ''}`,
      description: a.summary || a.input || 'AI assessment saved',
      icon: 'smart_toy',
      color: 'bg-primary/10',
    }))

    if (ev.length === 0 && diseases.length > 0) {
      const sample = diseases.slice(0, 5)
      sample.forEach((d, i) => ev.push({
        date: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
        title: `AI Assessment — Possible ${d.name}`,
        description: `Symptoms matched: ${d.symptoms.slice(0, 4).join(', ')}`,
        icon: 'smart_toy',
        color: 'bg-primary/10',
      }))
    }

    // sort descending by date when possible
    ev.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    return ev.map((e) => ({ ...e, date: fmtDate(e.date) }))
  }, [appointments, reports, prescriptions, assessments, diseases])

  return (
    <div className="p-6 lg:p-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patient History</h1>
          <p className="text-sm text-on-surface-variant">Complete longitudinal health timeline for {user?.name || 'you'}.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/upload-report" className="text-primary font-semibold">Upload Report</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-xl p-6">
          {loading ? <p>Loading records...</p> : <Timeline events={events} />}
        </div>

        <aside className="bg-surface rounded-xl p-6">
          <h3 className="font-semibold mb-3">Health Summary</h3>
          <p className="text-sm text-on-surface-variant mb-4">Quick links and key insights</p>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold">Top Diseases in Dataset</h4>
              <ul className="mt-2 text-sm text-on-surface-variant list-disc list-inside">
                {diseases.slice(0, 5).map((d) => (
                  <li key={d.name}>{d.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Precautions</h4>
              <p className="text-sm text-on-surface-variant mt-2">Select an event to see precautions.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
