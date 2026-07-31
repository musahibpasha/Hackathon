import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Icon from '../components/ui/Icon'
import DoctorCard from '../components/ui/DoctorCard'
import { doctors as DEMO_DOCTORS } from '../lib/dummyData'

export default function FindDoctors() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const initialSpecialty = state?.specialist || ''
  const [doctors, setDoctors] = useState(DEMO_DOCTORS)
  const [specialty, setSpecialty] = useState(initialSpecialty)
  const [locationQ, setLocationQ] = useState('')
  const [minRating, setMinRating] = useState('')

  useEffect(() => {
    // demo: filter local data; in production, call doctorAPI.list with params
    let list = DEMO_DOCTORS
    if (specialty) list = list.filter((d) => d.department?.toLowerCase().includes(specialty.toLowerCase()) || d.specialty?.toLowerCase().includes(specialty.toLowerCase()))
    if (minRating) list = list.filter((d) => Number(d.rating) >= Number(minRating))
    setDoctors(list)
  }, [specialty, minRating])

  const handleBook = (doctor, slot) => {
    navigate('/book-appointment', { state: { doctor, slot } })
  }

  return (
    <div className="flex flex-col w-full">
      <section className="relative px-4 lg:px-12 py-12 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 -mb-20 w-64 h-64 bg-primary-container/5 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">Specialized Care</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4">Find your dedicated specialist.</h1>
            <p className="text-lg text-on-surface-variant max-w-lg">Connect with top-rated medical professionals. Filter by expertise, availability, and patient satisfaction.</p>
          </div>
          <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-2xl shadow-sm">
            <div className="flex -space-x-3">
              {DEMO_DOCTORS.slice(0, 3).map((d) => (
                <img key={d.id} src={d.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-surface object-cover" />
              ))}
            </div>
            <div className="pr-4">
              <p className="text-sm font-semibold text-on-surface">{DEMO_DOCTORS.length}+ Specialists</p>
              <p className="text-xs text-on-surface-variant">Available this week</p>
            </div>
          </div>
        </div>

        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-surface-container-lowest rounded-3xl shadow-xl shadow-primary/5">
          <div className="flex items-center gap-3 px-4 py-3 bg-surface-container rounded-2xl">
            <Icon name="medical_services" className="text-primary" />
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="bg-transparent w-full text-sm font-semibold text-on-surface focus:outline-none">
              <option value="">All Specializations</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Internal Medicine">Internal Medicine</option>
            </select>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-surface-container rounded-2xl">
            <Icon name="location_on" className="text-primary" />
            <input value={locationQ} onChange={(e) => setLocationQ(e.target.value)} placeholder="Location..." className="bg-transparent w-full text-sm font-semibold text-on-surface focus:outline-none" />
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-surface-container rounded-2xl">
            <Icon name="star" className="text-primary" />
            <select value={minRating} onChange={(e) => setMinRating(e.target.value)} className="bg-transparent w-full text-sm font-semibold text-on-surface focus:outline-none">
              <option value="">Rating (Any)</option>
              <option value="4.5">4.5</option>
              <option value="4.0">4.0</option>
            </select>
          </div>
          <button className="bg-primary text-on-primary text-sm font-semibold py-3 px-6 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <Icon name="search" className="text-xl" />
            Search Providers
          </button>
        </div>
      </section>

      <section className="px-4 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={handleBook} />
          ))}
        </div>
      </section>
    </div>
  )
}
