const tones = {
  orange: 'bg-brand-600/25 text-brand-300',
  green: 'bg-emerald-500/20 text-emerald-300',
  blue: 'bg-sky-500/20 text-sky-300',
  slate: 'bg-white/10 text-white/80',
  red: 'bg-red-500/20 text-red-300',
};

export const Badge = ({ children, tone = 'orange', className = '' }) => (
  <span
    className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm ${tones[tone]} ${className}`}
  >
    {children}
  </span>
);
