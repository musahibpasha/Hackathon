import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { appointmentAPI } from '../services/api'
import Icon from '../components/ui/Icon'

const DEMO_APPOINTMENTS = {
  upcoming: [
    {
      id: 1,
      doctor: 'Dr. Sarah Jenkins',
      specialty: 'Senior Cardiologist',
      date: '2026-08-12',
      time: '10:30 AM',
      status: 'Confirmed',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBpEdtEHS-hN9ioALd7sssp5P3czq24VN3o8YfziZeKP03ppIVZ8XN8nzcZEsS150ENazzUYHLbMIH_2E2Czvt-0Nb-ZLLhoWNHdx4jV6RrP9amw5YV4sbZ90phK9aGSy0YDurUmVZ4ZkBh_24a_Z_lKoasDapRCkPZY1rsbeaPOBqnFuAQLTjYxiRqO9CTbb-DQrhu1JWQFeLDJIKA54SLchVl6tXDXEPE37XJCZnaf8BMKfrdPzvT',
    },
    {
      id: 2,
      doctor: 'Dr. Marcus Chen',
      specialty: 'Neurologist',
      date: '2026-08-18',
      time: '2:15 PM',
      status: 'Confirmed',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAvYH1EvRcflFD3jGQqIhTav71EwUy-8WQHooEYFFr7i9X5xvd0n_fBWU6ohMf91iMOjizXcax8a4IXm7pO-UKVcV6TIMoBNqz26iRlAuPTuKsTn6DWZMwZddn0_6gLgRXmJPuKcTuUMIG1TtA97Klou_5G58kKjSk1XhzpKz-Gq7kKx7oMsqqgrNS5WCGiE-fxxUyfTdbvIY7pzinBh9nr2HWUQUpZD9RMZC1lObjK4A__TUzurbLE',
    },
    {
      id: 3,
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      date: '2026-08-24',
      time: '9:00 AM',
      status: 'Pending',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAV5n4OORej9KxlkUqIqNr1wkixeAfjKfeNjZFOUcpczooygmtB6M79mOaA_VFnuJAmCRpvCzepbsBMSnKmL5N0lLBWOP5HZVvSZt5YYTVPlHRimOp0SFH6_vnfI-sjN83k4O2ItdLpLiVqufXTHnr5D1_iDwHmtCahf3kpZggKhz8B4Dwat2Zvk7zFEaVRfcjBWRw9-YKDfnR92YDYji_3BV-n3l05iKEL9JtMEcY2UuuBBljK50d-',
    },
  ],
  past: [
    {
      id: 4,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Physician',
      date: '2026-07-15',
      time: '4:00 PM',
      status: 'Completed',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuATifJEdQFTRJVsKBiPPtRzgaLrmuwPX5Sm0VO0MRJgCANU1T6zRL50YvLnV_2KvExzw9U8ch4fxvUnad5EVL18bS_saIq7oF_XN9pjMmhX42nnVW9tpj6L6FDXrcLy_Zo2B61v3am2Jbv2akLOQ5kXxqTI293DOW1hXGV3BTB55vy0FJM0b2QN49bUJl-UwVFF3eI7OfwLq3n1o7FfgidB9LksM-E36zLsS9ipQFCDDIs0gmyCT_dA',
    },
  ],
  cancelled: [],
}

const TABS = [
  { id: 'upcoming', label: 'Upcoming Appointments' },
  { id: 'past', label: 'Past History' },
  { id: 'cancelled', label: 'Cancelled' },
]

export default function Appointments() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [appointments, setAppointments] = useState(DEMO_APPOINTMENTS)
  const [search, setSearch] = useState('')

  useEffect(() => {
    appointmentAPI
      .list()
      .then(({ data }) => {
        if (data?.upcoming || Array.isArray(data)) {
          setAppointments(
            Array.isArray(data)
              ? { upcoming: data, past: [], cancelled: [] }
              : data
          )
        }
      })
      .catch(() => {})
  }, [])

  const handleCancel = async (id) => {
    try {
      await appointmentAPI.cancel(id)
    } catch { /* demo mode */ }
    setAppointments((prev) => {
      const apt = prev.upcoming.find((a) => a.id === id)
      if (!apt) return prev
      return {
        ...prev,
        upcoming: prev.upcoming.filter((a) => a.id !== id),
        cancelled: [...prev.cancelled, { ...apt, status: 'Cancelled' }],
      }
    })
    toast.success('Appointment cancelled')
  }

  const list = (appointments[activeTab] || []).filter(
    (a) =>
      !search ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.specialty.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="flex flex-col w-full">
      <div className="relative px-4 lg:px-12 py-8 bg-gradient-to-b from-surface-container-low to-background">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-2 block">
              Patient Records
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-on-surface">Appointment History</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctor or clinic..."
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
            </div>
            <Link
              to="/find-doctors"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold shadow-md hover:opacity-90"
            >
              <Icon name="add" className="text-lg" />
              Book New
            </Link>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 -mb-20 relative z-10">
          {[
            { label: 'Total Visits', value: '24', accent: 'primary' },
            { label: 'Upcoming', value: String(appointments.upcoming.length).padStart(2, '0'), accent: 'secondary' },
            { label: 'Adherence Rate', value: '98%', accent: 'default' },
            { label: 'Active Prescriptions', value: '05', accent: 'default' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-surface-container-lowest p-6 rounded-2xl shadow-xl shadow-primary/5 hover:-translate-y-1 transition-transform ${
                stat.accent === 'secondary' ? 'border-b-4 border-secondary' : ''
              }`}
            >
              <p className="text-xs text-on-surface-variant mb-1">{stat.label}</p>
              <p className={`text-2xl font-semibold ${stat.accent === 'primary' ? 'text-primary' : stat.accent === 'secondary' ? 'text-secondary' : 'text-on-surface'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 lg:px-12 pt-32 pb-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8 border-b border-outline-variant mb-8 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab.label}
                {tab.id === 'upcoming' && appointments.upcoming.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px]">
                    {appointments.upcoming.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {list.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-12 text-center">
                <Icon name="event_busy" className="text-5xl text-outline mb-4" />
                <p className="font-semibold mb-2">No appointments found</p>
                <Link to="/find-doctors" className="text-primary font-semibold text-sm hover:underline">
                  Find a doctor to book
                </Link>
              </div>
            ) : (
              list.map((apt) => (
                <div
                  key={apt.id}
                  className="group flex flex-col md:flex-row items-center gap-6 p-6 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-transparent hover:border-primary"
                >
                  <div className="flex items-center gap-4 w-full md:w-1/3">
                    <div className="relative w-16 h-16 shrink-0">
                      <img src={apt.avatar} alt={apt.doctor} className="w-full h-full rounded-full object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary text-on-secondary rounded-full flex items-center justify-center border-2 border-surface-container-lowest">
                        <Icon name="verified" className="text-sm filled" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{apt.doctor}</p>
                      <p className="text-sm text-on-surface-variant">{apt.specialty}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 flex-1 w-full md:w-auto">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-surface-container rounded-lg">
                        <Icon name="event" className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-on-surface-variant uppercase">Date</p>
                        <p className="text-sm font-medium">{formatDate(apt.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-surface-container rounded-lg">
                        <Icon name="schedule" className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-on-surface-variant uppercase">Time</p>
                        <p className="text-sm font-medium">{apt.time}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.status === 'Confirmed'
                          ? 'bg-secondary-container/30 text-on-secondary-container'
                          : apt.status === 'Completed'
                            ? 'bg-surface-container text-on-surface-variant'
                            : apt.status === 'Cancelled'
                              ? 'bg-error-container/50 text-error'
                              : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {activeTab === 'upcoming' && (
                      <>
                        <button
                          type="button"
                          className="flex-1 md:flex-none px-6 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:opacity-90"
                        >
                          Join Call
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancel(apt.id)}
                          className="p-2 text-on-surface-variant hover:bg-error-container hover:text-error rounded-xl transition-colors"
                        >
                          <Icon name="close" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
