export default function Card({ className = '', children }) {
  return (
    <div className={`rounded-[24px] border border-outline-variant bg-white/80 backdrop-blur-xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}
