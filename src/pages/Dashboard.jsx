import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/ui/Icon'
import useNormalizedData from '../hooks/useNormalizedData'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from 'recharts'

const appointments = [
  { date: 'OCT 24', doctor: 'Dr. Sarah Jenkins', type: 'Cardiology Check-up', time: '09:30 AM', color: 'primary' },
  { date: 'OCT 28', doctor: 'Dr. Michael Chen', type: 'General Consultation', time: '02:15 PM', color: 'secondary' },
]

const quickActions = [
  { to: '/symptom-checker', icon: 'clinical_notes', label: 'Check Symptoms', hover: 'hover:bg-primary hover:text-on-primary' },
  { to: '/upload-report', icon: 'upload_file', label: 'Upload Report', hover: 'hover:bg-secondary hover:text-on-secondary' },
  { to: '/medicine-reminder', icon: 'medication', label: 'Medicine Reminder', hover: 'hover:bg-on-surface hover:text-surface' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const firstName = user?.name?.split(' ')[0] || 'User'

  useEffect(() => {
    const stored = localStorage.getItem('healthProfile')
    if (stored) {
      setProfile(JSON.parse(stored))
    }
  }, [])

  const summary = useMemo(() => {
    if (!profile) return { bloodGroup: 'N/A', bmi: 'N/A', conditions: 'None listed', allergies: 'None listed', emergency: 'Not set' }
    return {
      bloodGroup: profile.bloodGroup || 'N/A',
      bmi: profile.bmi || 'N/A',
      conditions: profile.conditions || 'None listed',
      allergies: profile.allergies || 'None listed',
      emergency: `${profile.emergencyName || 'Not set'} • ${profile.emergencyPhone || '—'}`,
    }
  }, [profile])

  const { diseases, counts, medicines, loading: dataLoading, severity, precautions } = useNormalizedData()

  const topDiseases = useMemo(() => {
    if (!counts) return []
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  }, [counts])

  const chartData = useMemo(() => {
    if (!counts) return []
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
  }, [counts])

  const samplePatient = useMemo(() => {
    if (!diseases || diseases.length === 0) return null
    const sorted = diseases.slice().sort((a, b) => (b.symptoms?.length || 0) - (a.symptoms?.length || 0))
    const primary = sorted[0]
    const severityScore = primary.symptoms?.reduce((sum, symptom) => sum + (severity[symptom] || 3), 0) || 0
    const avgSeverity = primary.symptoms?.length ? severityScore / primary.symptoms.length : 0
    const severityLabel = avgSeverity ? (avgSeverity < 3.5 ? 'Low' : avgSeverity < 5.5 ? 'Medium' : 'High') : 'N/A'
    const recommendedPrecautions = precautions?.[primary.name] || []
    const matchedMedicines = medicines.filter((m) => {
      const indication = String(m.indication || '').toLowerCase()
      return indication.includes(primary.name.toLowerCase()) || primary.symptoms.some((s) => indication.includes(s.replace(/_/g, ' ')))
    }).slice(0, 3)
    return {
      name: 'Patient X',
      age: 42,
      gender: 'Female',
      condition: primary.name,
      symptoms: primary.symptoms || [],
      severityLabel,
      severityScore: avgSeverity.toFixed(1),
      precautions: recommendedPrecautions,
      medicines: matchedMedicines.length ? matchedMedicines : medicines.slice(0, 3),
    }
  }, [diseases, medicines, precautions, severity])

  const diseaseCount = useMemo(() => diseases?.length || 0, [diseases])
  const symptomCount = useMemo(() => {
    const unique = new Set()
    diseases?.forEach((d) => d.symptoms?.forEach((s) => unique.add(s)))
    return unique.size
  }, [diseases])

  const avgSeverityLabel = useMemo(() => {
    if (!diseases || !Object.keys(severity || {}).length) return 'N/A'
    let total = 0
    let cnt = 0
    diseases.forEach((d) => {
      const svals = (d.symptoms || []).map((s) => severity[s] || 3)
      if (svals.length === 0) return
      total += svals.reduce((a, b) => a + b, 0) / svals.length
      cnt += 1
    })
    if (cnt === 0) return 'N/A'
    const avg = total / cnt
    if (avg < 3.5) return 'Low'
    if (avg < 5.5) return 'Medium'
    return 'High'
  }, [diseases, severity])

  return (
    <div className="p-4 lg:p-12 space-y-6">
      <div className="relative overflow-hidden bg-primary rounded-xl p-8 lg:p-12 text-on-primary shadow-xl">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <path
              d="M44.7,-76.4C58.3,-69.2,70,-57.5,78.2,-43.8C86.4,-30.1,91.1,-15.1,90.2,-0.5C89.3,14,82.8,28.1,73.8,40.3C64.8,52.5,53.3,62.8,40.1,70.9C26.9,79,12,84.9,-3.1,90.3C-18.2,95.7,-36.3,100.5,-51.1,94.2C-65.9,87.9,-77.3,70.5,-84.1,52.7C-90.8,34.9,-92.9,16.7,-89.6,0.1C-86.3,-16.5,-77.7,-31.5,-67.2,-44.6C-56.7,-57.8,-44.3,-69,-30.7,-76.2C-17.1,-83.4,-8.6,-86.6,4.3,-94.1C17.2,-101.6,31.2,-83.6,44.7,-76.4Z"
              fill="currentColor"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-primary-fixed-dim uppercase tracking-widest mb-2">
              Personalized Overview
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Good morning, {firstName}.</h1>
            <p className="text-lg text-on-primary/80 max-w-xl">
              You have 2 appointments scheduled. Your latest health metrics look consistent with your baseline.
            </p>
          </div>
          <div className="flex -space-x-3">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-secondary text-on-secondary ring-4 ring-primary font-semibold text-sm shadow-lg">
              +2
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Health Summary</h2>
              <p className="text-sm text-on-surface-variant">Your latest wellness snapshot</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-on-surface-variant">
              <div className="rounded-3xl bg-surface-container p-4">
                <p className="text-xs uppercase tracking-[0.2em]">Blood Group</p>
                <p className="mt-3 text-lg font-semibold text-on-surface">{summary.bloodGroup}</p>
              </div>
              <div className="rounded-3xl bg-surface-container p-4">
                <p className="text-xs uppercase tracking-[0.2em]">BMI</p>
                <p className="mt-3 text-lg font-semibold text-on-surface">{summary.bmi}</p>
              </div>
              <div className="rounded-3xl bg-surface-container p-4">
                <p className="text-xs uppercase tracking-[0.2em]">Existing Conditions</p>
                <p className="mt-3 text-lg font-semibold text-on-surface">{summary.conditions}</p>
              </div>
              <div className="rounded-3xl bg-surface-container p-4">
                <p className="text-xs uppercase tracking-[0.2em]">Allergies</p>
                <p className="mt-3 text-lg font-semibold text-on-surface">{summary.allergies}</p>
              </div>
            </div>
            <div className="mt-6 rounded-3xl bg-primary/5 p-4 border border-primary/10">
              <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Emergency Contact</p>
              <p className="mt-2 text-sm text-on-surface">{summary.emergency}</p>
            </div>
          </div>
          <div className="bg-surface rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Patient Snapshot</h2>
                <p className="text-sm text-on-surface-variant">Based on your dataset's most detailed condition.</p>
              </div>
              <Link to="/patient-history" className="text-primary text-sm font-semibold hover:underline">View Full</Link>
            </div>
            {dataLoading ? (
              <p className="text-sm text-on-surface-variant">Loading patient dataset...</p>
            ) : samplePatient ? (
              <div className="space-y-4 text-sm text-on-surface-variant">
                <div className="grid grid-cols-2 gap-4 text-base">
                  <div className="rounded-3xl bg-surface-container p-4">
                    <p className="text-xs uppercase tracking-[0.2em]">Patient</p>
                    <p className="mt-3 font-semibold text-on-surface">{samplePatient.name}, {samplePatient.age}</p>
                    <p className="text-sm text-on-surface-variant">{samplePatient.gender}</p>
                  </div>
                  <div className="rounded-3xl bg-surface-container p-4">
                    <p className="text-xs uppercase tracking-[0.2em]">Current Condition</p>
                    <p className="mt-3 font-semibold text-on-surface">{samplePatient.condition}</p>
                    <p className="text-sm text-on-surface-variant">Severity: {samplePatient.severityLabel}</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-surface-container p-4">
                  <p className="text-xs uppercase tracking-[0.2em]">Key Symptoms</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {samplePatient.symptoms.map((symptom) => (
                      <span key={symptom} className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">{symptom.replace(/_/g, ' ')}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-3xl bg-surface-container p-4">
                    <p className="text-xs uppercase tracking-[0.2em]">Recommended Precautions</p>
                    <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-on-surface-variant">
                      {samplePatient.precautions.length > 0 ? samplePatient.precautions.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      )) : <li>No dataset precautions found.</li>}
                    </ul>
                  </div>
                  <div className="rounded-3xl bg-surface-container p-4">
                    <p className="text-xs uppercase tracking-[0.2em]">Suggested Medicines</p>
                    <div className="mt-3 space-y-2 text-sm text-on-surface-variant">
                      {samplePatient.medicines.map((med) => (
                        <div key={med.id} className="rounded-xl bg-surface-container-highest p-3">
                          <p className="font-semibold text-on-surface">{med.name}</p>
                          <p>{med.indication}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant">No sample patient data available from the dataset.</p>
            )}
          </div>
          <div className="bg-surface rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
              <Link to="/appointments" className="text-primary text-sm font-semibold hover:underline">
                View Calendar
              </Link>
            </div>
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.date + apt.doctor}
                  className="group bg-surface-container-low hover:bg-surface-container-high transition-all p-4 rounded-xl flex items-center gap-4 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center bg-primary/10 text-primary">
                    <span className="text-xs leading-none">{apt.date.split(' ')[0]}</span>
                    <span className="text-lg font-semibold leading-none">{apt.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{apt.doctor}</p>
                    <p className="text-sm text-on-surface-variant">{apt.type} • {apt.time}</p>
                  </div>
                  <Icon name="chevron_right" className="text-outline group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className={`flex items-center gap-4 p-4 bg-surface-container-highest/30 ${action.hover} rounded-xl transition-all group shadow-sm`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-white/20 flex items-center justify-center">
                  <Icon name={action.icon} />
                </div>
                <span className="font-semibold text-sm">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-surface rounded-xl shadow-sm p-6 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="auto_awesome" className="text-secondary filled" />
                  <h2 className="text-lg font-semibold">Dataset-backed Patient Case</h2>
                </div>
                <p className="text-sm text-on-surface-variant">Built from the shared dataset to show a full patient profile and condition summary.</p>
              </div>
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-medium">
                Dataset Case
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <div className="p-4 bg-surface-container rounded-xl">
                <p className="text-xs text-on-secondary-fixed-variant mb-2 font-medium">Condition Profile</p>
                {samplePatient ? (
                  <>
                    <p className="text-lg font-semibold">{samplePatient.condition}</p>
                    <p className="text-sm text-on-surface-variant mt-2">Severity: {samplePatient.severityLabel}</p>
                    <p className="text-sm mt-3">Matched symptoms: {samplePatient.symptoms.length}</p>
                  </>
                ) : (
                  <p className="text-sm text-on-surface-variant">No patient profile could be synthesized from the dataset.</p>
                )}
              </div>
              <div className="p-4 bg-surface-container rounded-xl">
                <p className="text-xs text-on-secondary-fixed-variant mb-2 font-medium">Dataset Coverage</p>
                <p className="text-lg font-semibold">{diseaseCount} conditions</p>
                <p className="text-sm text-on-surface-variant mt-2">{symptomCount} unique symptoms</p>
                <p className="text-sm mt-3">Top dataset condition: {topDiseases[0]?.[0] ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {samplePatient && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-primary/40">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Likely Diagnosis</p>
                <p className="mt-3 text-xl font-semibold text-on-surface">{samplePatient.condition}</p>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-secondary/40">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Severity</p>
                <p className="mt-3 text-xl font-semibold text-on-surface">{samplePatient.severityLabel}</p>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-error/40">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Symptom Count</p>
                <p className="mt-3 text-xl font-semibold text-on-surface">{samplePatient.symptoms.length}</p>
              </div>
            </div>
          )}

          {chartData.length > 0 && (
            <div className="bg-surface rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Dataset Insights</h2>
                <div className="text-sm text-on-surface-variant">Severity: <span className="font-semibold">{avgSeverityLabel}</span></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={70} innerRadius={30}>
                        {chartData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={[ '#2563EB', '#10B981', '#06B6D4', '#7C3AED', '#F59E0B', '#EF4444' ][idx % 6]} />
                        ))}
                      </Pie>
                      <ReTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-3 text-on-surface-variant">Top Diseases</p>
                  <div className="space-y-2">
                    {topDiseases.map(([d, c]) => (
                      <div key={d} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full bg-primary" />
                          <div className="text-sm font-medium">{d}</div>
                        </div>
                        <div className="text-sm text-on-surface-variant">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {samplePatient && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-primary/40">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Likely Diagnosis</p>
                <p className="mt-3 text-xl font-semibold text-on-surface">{samplePatient.condition}</p>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-secondary/40">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Severity</p>
                <p className="mt-3 text-xl font-semibold text-on-surface">{samplePatient.severityLabel}</p>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4 border-error/40">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Symptom Count</p>
                <p className="mt-3 text-xl font-semibold text-on-surface">{samplePatient.symptoms.length}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
