import { useLocation, Link, Navigate } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import { useEffect } from 'react'

export default function AIResult() {
  const { state } = useLocation()

  if (!state?.result) return <Navigate to="/dashboard" replace />

  const { result, type, input } = state
  const isSymptom = type === 'symptom'

  useEffect(() => {
    try {
      const key = 'assessments'
      const stored = JSON.parse(localStorage.getItem(key) || '[]')
      const entry = {
        id: result.caseId || `AI-${Date.now()}`,
        date: new Date().toISOString(),
        type: type || 'ai',
        input: input || '',
        severity: result.severity || 'Unknown',
        summary: result.summary || '',
        recommendations: result.recommendations || [],
      }
      stored.unshift(entry)
      localStorage.setItem(key, JSON.stringify(stored.slice(0, 200)))
    } catch (e) {
      // ignore storage errors
    }
  }, [result, type, input])

  const severityColor =
    result.severity?.toLowerCase().includes('mild') || result.severity?.toLowerCase().includes('normal')
      ? 'bg-secondary-container text-on-secondary-container'
      : result.severity?.toLowerCase().includes('high') || result.severity?.toLowerCase().includes('critical')
        ? 'bg-error-container text-on-error-container'
        : 'bg-primary-fixed text-on-primary-fixed'

  return (
    <div className="p-4 lg:p-12 max-w-[1440px] mx-auto">
      <div className="mb-8">
        <Link to={isSymptom ? '/symptom-checker' : '/upload-report'} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline mb-4">
          <Icon name="arrow_back" className="text-lg" />
          Back to {isSymptom ? 'Symptom Checker' : 'Upload Report'}
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Icon name="auto_awesome" className="text-secondary filled" />
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">AI Analysis Complete</span>
        </div>
        <h1 className="text-3xl font-bold">Assessment Result</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/20">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {isSymptom ? 'Symptom Assessment' : 'Report Analysis'}
                </h2>
                <p className="text-xs text-secondary uppercase tracking-widest font-semibold">
                  Case ID: {result.caseId}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${severityColor}`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                {result.severity} Severity
              </span>
            </div>

            <div className="bg-surface-container rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-on-surface-variant uppercase mb-2">Your Input</p>
              <p className="text-sm">{input}</p>
            </div>

            <p className="text-base leading-relaxed mb-8">{result.summary}</p>

            {result.causes && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-on-surface-variant uppercase mb-4">Potential Causes</p>
                <div className="space-y-3">
                  {result.causes.map((cause) => (
                    <div key={cause.name} className="flex items-center justify-between p-4 bg-surface/50 rounded-xl">
                      <span className="font-medium">{cause.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: `${cause.match}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-secondary">{cause.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.findings && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-on-surface-variant uppercase mb-4">Key Findings</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-outline-variant">
                        <th className="text-left py-3 font-semibold">Parameter</th>
                        <th className="text-left py-3 font-semibold">Value</th>
                        <th className="text-left py-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.findings.map((f) => (
                        <tr key={f.parameter} className="border-b border-outline-variant/50">
                          <td className="py-3">{f.parameter}</td>
                          <td className="py-3 font-medium">{f.value}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              f.status === 'Normal' ? 'bg-secondary-container/30 text-on-secondary-container' :
                              f.status.includes('High') || f.status === 'Low' ? 'bg-error-container/50 text-error' :
                              'bg-surface-container text-on-surface-variant'
                            }`}>
                              {f.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="recommend" className="text-primary" />
              Recommendations
            </h3>
            <ul className="space-y-3">
              {(result.recommendations || []).map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <Icon name="check_circle" className="text-secondary flex-shrink-0 text-lg" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary rounded-2xl p-6 text-on-primary">
            <h3 className="font-semibold mb-3">Next Steps</h3>
            <div className="space-y-3">
              <Link to="/find-doctors" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-semibold">
                <Icon name="medical_services" />
                Find a Doctor
              </Link>
              <Link to="/appointments" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-semibold">
                <Icon name="calendar_today" />
                Book Appointment
              </Link>
              <Link to="/health-timeline" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-semibold">
                <Icon name="timeline" />
                Save to Timeline
              </Link>
            </div>
          </div>

          <div className="bg-error-container/30 rounded-xl p-4 border border-error/20">
            <div className="flex gap-2">
              <Icon name="info" className="text-error flex-shrink-0" />
              <p className="text-xs text-on-surface-variant">
                This AI assessment is for informational purposes only and does not replace professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
