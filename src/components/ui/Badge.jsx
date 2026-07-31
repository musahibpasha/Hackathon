export default function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-surface-container text-on-surface-variant',
    success: 'bg-secondary-container text-on-secondary-container',
    warning: 'bg-primary-fixed text-on-primary-fixed',
    danger: 'bg-error-container text-on-error-container',
  }
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]}`}>{children}</span>
}
