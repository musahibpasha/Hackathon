import TimelineItem from './TimelineItem'

export default function Timeline({ events = [] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-outline-variant" />
      <div className="space-y-6">
        {events.map((e, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-5 top-1 w-2 h-2 rounded-full bg-primary" />
            <TimelineItem event={e} />
          </div>
        ))}
      </div>
    </div>
  )
}
