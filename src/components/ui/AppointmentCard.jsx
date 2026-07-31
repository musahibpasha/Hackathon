import Icon from './Icon'
import Badge from './Badge'

export default function AppointmentCard({ appointment, actions }) {
  const statusVariant = appointment.status === 'Confirmed' ? 'success' : appointment.status === 'Completed' ? 'default' : 'danger'

  return (
    <div className="rounded-[28px] border border-outline-variant bg-surface-container p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <p className="text-sm font-semibold text-on-surface">{appointment.doctor}</p>
          <p className="text-sm text-on-surface-variant">{appointment.hospital}</p>
        </div>
        <Badge variant={statusVariant}>{appointment.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-on-surface-variant mb-4">
        <div className="flex items-center gap-2">
          <Icon name="event" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="schedule" />
          <span>{appointment.time}</span>
        </div>
      </div>
      {actions}
    </div>
  )
}
