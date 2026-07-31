import Icon from './Icon'

export default function TimelineItem({ event }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${event.color || 'bg-primary/10 text-primary'}`}>
          <Icon name={event.icon || 'medical_services'} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{event.title}</h4>
          <div className="text-xs text-on-surface-variant">{event.date}</div>
        </div>
        <p className="text-sm text-on-surface-variant mt-1">{event.description}</p>
      </div>
    </div>
  )
}
