import { formatCurrency } from '../../utils/format';

export const OrderSummary = ({ items, total }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
    <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item._id || item.menuId} className="flex items-start justify-between gap-3 text-sm">
          <div>
            <p className="font-medium text-slate-800">{item.name}</p>
            <p className="text-slate-500">
              {item.quantity} × {formatCurrency(item.price)}
            </p>
          </div>
          <p className="font-semibold text-slate-800">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </li>
      ))}
    </ul>
    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
      <span className="font-semibold text-slate-700">Total</span>
      <span className="text-xl font-extrabold text-brand-700">{formatCurrency(total)}</span>
    </div>
  </div>
);
