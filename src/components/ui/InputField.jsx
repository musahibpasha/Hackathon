import Icon from './Icon'

export default function InputField({ label, icon, microphone, helper, ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-on-surface-variant">{label}</label>}
      <div className="relative">
        {icon && <Icon name={icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />}
        <input
          className={`w-full rounded-2xl border border-outline-variant bg-surface-container px-4 py-4 ${icon ? 'pl-12' : 'pl-4'} ${microphone ? 'pr-20' : 'pr-4'} text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10`}
          {...props}
        />
        {microphone && (
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-secondary">
            <Icon name="keyboard_voice" />
          </button>
        )}
      </div>
      {helper && <p className="text-xs text-on-surface-variant">{helper}</p>}
    </div>
  )
}
