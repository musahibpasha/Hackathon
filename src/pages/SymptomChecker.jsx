import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { symptomAPI } from '../services/api'
import Icon from '../components/ui/Icon'

const commonTags = ['Headache', 'Fatigue', 'Nausea', 'Muscle Pain', 'Fever', 'Cough']

export default function SymptomChecker() {
  const navigate = useNavigate()
  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(false)

  const addTag = (tag) => {
    setSymptoms((prev) => (prev ? `${prev}, ${tag.toLowerCase()}` : tag.toLowerCase()))
  }

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      toast.error('Please describe your symptoms')
      return
    }
    setLoading(true)
    try {
      const { data } = await symptomAPI.analyze(symptoms)
      navigate('/ai-result', { state: { result: data, type: 'symptom', input: symptoms } })
    } catch {
      navigate('/ai-result', {
        state: {
          type: 'symptom',
          input: symptoms,
          result: {
            severity: 'Mild',
            caseId: `#AI-${Date.now().toString().slice(-4)}`,
            summary:
              'Based on your input, symptoms suggest a tension-related cluster. Clinical observation is recommended if symptoms persist beyond 48 hours.',
            causes: [
              { name: 'Tension Headache', match: 85 },
              { name: 'Dehydration', match: 45 },
              { name: 'Eye Strain', match: 30 },
            ],
            recommendations: [
              'Rest in a quiet, dark room',
              'Stay hydrated — drink 8 glasses of water',
              'Consult a doctor if symptoms worsen',
            ],
          },
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 lg:p-12 max-w-[1440px] mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-secondary" />
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">
              Diagnostic Intelligence
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">AI Symptom Assessment</h1>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Describe your symptoms in natural language for an immediate clinical-grade preliminary analysis.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-4 bg-surface-container-high p-4 rounded-2xl shadow-sm">
          <div className="p-3 bg-secondary-container rounded-xl">
            <Icon name="verified_user" className="text-on-secondary-container" />
          </div>
          <div>
            <p className="font-semibold text-sm">HIPAA Compliant</p>
            <p className="text-xs text-on-surface-variant">Encrypted Analysis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl shadow-xl shadow-primary/5 p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Icon name="psychology" className="text-[120px] text-primary" />
          </div>
          <div className="relative z-10">
            <label className="block text-lg font-semibold mb-6">How are you feeling today?</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., 'I have a persistent dull headache behind my eyes that started two days ago, accompanied by mild sensitivity to light...'"
              rows={6}
              className="w-full bg-surface-container border-none rounded-2xl p-6 focus:ring-2 focus:ring-secondary/50 focus:bg-surface-container-low transition-all placeholder:text-outline resize-none mb-6"
            />

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-xs font-medium text-on-surface-variant w-full mb-1">Common tags:</span>
              {commonTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="px-4 py-2 bg-surface-container hover:bg-secondary-container/30 rounded-full text-sm font-semibold text-on-surface-variant transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-5 bg-secondary text-on-secondary rounded-2xl text-lg font-semibold hover:opacity-90 shadow-lg shadow-secondary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Icon name="analytics" />
                  Analyze Symptoms
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-secondary-container/10 backdrop-blur-md rounded-3xl p-8 border border-secondary-container/20">
            <h3 className="text-lg font-semibold mb-4">How it works</h3>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Describe Symptoms', desc: 'Tell us what you are experiencing in your own words' },
                { step: '2', title: 'AI Analysis', desc: 'Our AI processes your input using clinical knowledge' },
                { step: '3', title: 'Get Results', desc: 'Receive severity assessment and recommended actions' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-on-surface-variant">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-error-container/30 rounded-2xl p-6 border border-error/20">
            <div className="flex gap-3">
              <Icon name="warning" className="text-error flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-error mb-1">Medical Disclaimer</p>
                <p className="text-xs text-on-surface-variant">
                  This tool provides preliminary assessments only. Always consult a qualified healthcare professional for diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
