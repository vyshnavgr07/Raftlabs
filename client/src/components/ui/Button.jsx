const variants = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-500 focus-visible:ring-brand-500 shadow-soft',
  secondary:
    'bg-white/10 text-white border border-white/15 hover:bg-white/15 focus-visible:ring-white/30',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  ghost: 'bg-transparent text-white/80 hover:bg-white/10 focus-visible:ring-white/30',
};

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12100e] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
