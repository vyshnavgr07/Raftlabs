export const Loader = ({ label = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20" role="status">
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full border-2 border-brand-900" />
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-500" />
    </div>
    <p className="text-sm font-medium text-white/55">{label}</p>
  </div>
);
