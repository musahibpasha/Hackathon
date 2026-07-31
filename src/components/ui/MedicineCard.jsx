import Button from './Button'

export default function MedicineCard({ medicine, onDetails }) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant">
      <div className="mb-3">
        <h4 className="font-semibold text-on-surface">{medicine.name}</h4>
        <div className="text-xs text-on-surface-variant">{medicine.category} • {medicine.form}</div>
      </div>
      <div className="text-sm text-on-surface-variant mb-4">{medicine.indication || 'No indication provided'}</div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-on-surface-variant">{medicine.strength}</div>
        <Button variant="ghost" onClick={onDetails}>Details</Button>
      </div>
    </div>
  )
}
