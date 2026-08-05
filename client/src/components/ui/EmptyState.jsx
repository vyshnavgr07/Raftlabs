export const EmptyState = ({ title, description, action = null }) => (
  <div className="surface px-6 py-14 text-center shadow-soft">
    <h3 className="font-display text-xl font-bold text-white">{title}</h3>
    {description ? <p className="mx-auto mt-2 max-w-md text-sm text-white/55">{description}</p> : null}
    {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
  </div>
);
