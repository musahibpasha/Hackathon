import Icon from './Icon'
import Button from './Button'

export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="group rounded-[32px] border border-outline-variant bg-surface-container-lowest p-6 shadow-sm hover:shadow-xl transition-all">
      <div className="flex items-center gap-5 mb-6">
        <img src={doctor.avatar} alt={doctor.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-on-surface">{doctor.name}</h3>
          <p className="text-sm text-primary font-semibold">{doctor.department}</p>
          <p className="text-sm text-on-surface-variant mt-2">{doctor.hospital}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-on-surface-variant">
        <div className="rounded-3xl bg-surface p-4">
          <p className="font-semibold text-on-surface">{doctor.experience}</p>
          <p>Experience</p>
        </div>
        <div className="rounded-3xl bg-surface p-4">
          <p className="font-semibold text-on-surface">{doctor.rating}★</p>
          <p>Rating</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {doctor.languages.map((lang) => (
          <span key={lang} className="rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">{lang}</span>
        ))}
      </div>
      <div className="mb-6 text-sm text-on-surface-variant">Consultation fee starting at <span className="font-semibold text-on-surface">{doctor.fee}</span></div>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {doctor.slots.slice(0, 4).map((slot) => (
          <button key={slot} type="button" className="rounded-2xl bg-surface p-3 text-sm text-on-surface hover:bg-primary/10 transition-colors" onClick={() => onBook(doctor, slot)}>
            {slot}
          </button>
        ))}
      </div>
      <Button variant="primary" size="md" onClick={() => onBook(doctor, doctor.slots[0])}>
        Book Appointment
      </Button>
    </div>
  )
}
