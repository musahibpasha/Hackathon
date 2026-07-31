import { useMemo, useState } from 'react'
import useNormalizedData from '../hooks/useNormalizedData'
import MedicineCard from '../components/ui/MedicineCard'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

export default function MedicineLibrary() {
  const { medicines = [], loading } = useNormalizedData()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [selected, setSelected] = useState(null)

  const categories = useMemo(() => {
    const set = new Set()
    medicines.forEach((m) => m.category && set.add(m.category))
    return Array.from(set)
  }, [medicines])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return medicines.filter((m) => {
      if (category && m.category !== category) return false
      if (!q) return true
      return (m.name || '').toLowerCase().includes(q) || (m.indication || '').toLowerCase().includes(q)
    })
  }, [medicines, query, category])

  return (
    <div className="p-6 lg:p-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Medicine Library</h1>
          <p className="text-sm text-on-surface-variant">Browse medicines parsed from the uploaded dataset.</p>
        </div>
        <div className="flex items-center gap-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search medicines or indication..." className="px-4 py-2 rounded-2xl border border-outline-variant focus:outline-none" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-2xl border border-outline-variant bg-white">
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Button variant="ghost" onClick={() => { setQuery(''); setCategory('') }}>
            <Icon name="refresh" />
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm">Loading medicines...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 && <div className="text-sm text-on-surface-variant">No medicines found.</div>}
          {filtered.map((med) => (
            <div key={med.id}>
              <MedicineCard medicine={med} onDetails={() => setSelected(med)} />
            </div>
          ))}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{selected.name}</h3>
              <div className="text-sm text-on-surface-variant">{selected.category}</div>
            </div>
            <div className="text-sm text-on-surface-variant">Strength: <span className="font-semibold text-on-surface">{selected.strength}</span></div>
            <div className="text-sm text-on-surface-variant">Form: <span className="font-semibold text-on-surface">{selected.form}</span></div>
            <div className="text-sm text-on-surface-variant">Manufacturer: <span className="font-semibold text-on-surface">{selected.manufacturer}</span></div>
            <div className="text-sm text-on-surface-variant">Indication: <span className="font-semibold text-on-surface">{selected.indication}</span></div>
            <div className="flex justify-end">
              <Button onClick={() => setSelected(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
