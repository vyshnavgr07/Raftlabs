export const Input = ({
  label,
  error,
  id,
  className = '',
  as = 'input',
  ...props
}) => {
  const Field = as === 'textarea' ? 'textarea' : 'input';

  return (
    <label className="block space-y-1.5" htmlFor={id}>
      {label ? <span className="text-sm font-semibold text-white/80">{label}</span> : null}
      <Field
        id={id}
        className={`field ${error ? '!border-red-400' : ''} ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  );
};
