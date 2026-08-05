import { Currency } from '../ui/Currency';

export const OrderSummary = ({ items, total }) => (
  <div className="surface p-5 shadow-soft sm:p-6">
    <h3 className="font-display text-xl font-bold text-white">Order Summary</h3>
    <ul className="mt-5 space-y-4">
      {items.map((item) => (
        <li key={item._id || item.menuId} className="flex items-start justify-between gap-3 text-sm">
          <div>
            <p className="font-semibold text-white">{item.name}</p>
            <p className="mt-0.5 inline-flex items-center gap-1 text-white/45">
              {item.quantity} × <Currency value={item.price} />
            </p>
          </div>
          <p className="font-semibold text-white">
            <Currency value={item.price * item.quantity} />
          </p>
        </li>
      ))}
    </ul>
    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
      <span className="font-semibold text-white/70">Total</span>
      <Currency value={total} className="font-display text-2xl font-bold text-brand-400" />
    </div>
  </div>
);
