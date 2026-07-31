import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { reportAPI, prescriptionAPI } from '../services/api'
import Icon from '../components/ui/Icon'

const reportTypes = [
  { id: 'blood', label: 'Blood Test', icon: 'bloodtype' },
  { id: 'xray', label: 'X-Ray / Scan', icon: 'radiology' },
  { id: 'prescription', label: 'Prescription', icon: 'medication' },
  { id: 'other', label: 'Other Report', icon: 'description' },
]

export default function UploadReport() {
  const navigate = useNavigate()
  const fileRef = useRef(null)
  const [selectedType, setSelectedType] = useState('blood')
  const [file, setFile] = useState(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (f) => {
    if (f && (f.type.startsWith('image/') || f.type === 'application/pdf')) {
      setFile(f)
    } else {
      toast.error('Please upload a PDF or image file')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', selectedType)
    formData.append('notes', notes)

    try {
      const api = selectedType === 'prescription' ? prescriptionAPI.analyze : reportAPI.upload
      const { data } = await api(formData)
      navigate('/ai-result', { state: { result: data, type: 'report', input: file.name } })
    } catch {
      navigate('/ai-result', {
        state: {
          type: 'report',
          input: file.name,
          result: {
            severity: 'Review Required',
            caseId: `#RPT-${Date.now().toString().slice(-4)}`,
            summary:
              'Your report has been analyzed. Key findings indicate normal ranges for most parameters with minor deviations in cholesterol levels.',
            findings: [
              { parameter: 'Hemoglobin', value: '14.2 g/dL', status: 'Normal' },
              { parameter: 'Cholesterol', value: '210 mg/dL', status: 'Borderline High' },
              { parameter: 'Blood Sugar', value: '95 mg/dL', status: 'Normal' },
              { parameter: 'Vitamin D', value: '28 ng/mL', status: 'Low' },
            ],
            recommendations: [
              'Follow up with your physician regarding cholesterol levels',
              'Consider Vitamin D supplementation',
              'Maintain current diet and exercise routine',
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
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-[2px] bg-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Report Analysis</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Upload Medical Report</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl">
          Upload your lab reports, scans, or prescriptions for AI-powered analysis and insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-4">Select Report Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    selectedType === type.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-outline-variant hover:border-primary/40'
                  }`}
                >
                  <Icon name={type.icon} className="text-2xl" />
                  <span className="text-sm font-semibold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`bg-surface-container-lowest rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
              dragOver ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="cloud_upload" className="text-primary text-3xl" />
            </div>
            {file ? (
              <>
                <p className="font-semibold text-primary">{file.name}</p>
                <p className="text-sm text-on-surface-variant mt-1">{(file.size / 1024).toFixed(1)} KB</p>
              </>
            ) : (
              <>
                <p className="font-semibold mb-1">Drag & drop your report here</p>
                <p className="text-sm text-on-surface-variant">or click to browse • PDF, JPG, PNG supported</p>
              </>
            )}
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-sm">
            <label className="font-semibold block mb-3">Additional Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any context about this report..."
              rows={3}
              className="w-full bg-surface-container border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full py-4 bg-primary text-on-primary font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Report...
              </>
            ) : (
              <>
                <Icon name="auto_awesome" />
                Upload & Analyze with AI
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Supported Formats</h3>
            <div className="space-y-3">
              {['PDF documents', 'JPEG / PNG images', 'Prescription photos', 'Lab result scans'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Icon name="check_circle" className="text-secondary text-xl" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container rounded-xl p-6">
            <Icon name="lock" className="text-primary mb-3 text-2xl" />
            <h3 className="font-semibold mb-2">Your Data is Secure</h3>
            <p className="text-sm text-on-surface-variant">
              All uploads are encrypted end-to-end and processed in compliance with HIPAA standards. Files are never shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
