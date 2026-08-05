import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/format';
import { STATUS_LABELS } from '../../constants/order';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Currency } from '../ui/Currency';

const statusTone = (status) => {
  if (status === 'DELIVERED') return 'green';
  if (status === 'OUT_FOR_DELIVERY') return 'blue';
  if (status === 'PREPARING') return 'orange';
  return 'slate';
};

export const OrderHistoryCard = ({ order }) => (
  <article className="surface flex flex-col gap-4 p-5 shadow-soft sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Order</p>
        <p className="mt-1 font-mono text-sm text-white/80 break-all">{order._id}</p>
      </div>
      <Badge tone={statusTone(order.status)}>
        {STATUS_LABELS[order.status] || order.status}
      </Badge>
    </div>

    <div className="grid gap-3 text-sm sm:grid-cols-2">
      <div>
        <p className="text-white/40">Placed</p>
        <p className="mt-1 font-semibold text-white">{formatDateTime(order.createdAt)}</p>
      </div>
      <div>
        <p className="text-white/40">Total</p>
        <p className="mt-1">
          <Currency value={order.total} className="font-display text-lg font-bold text-brand-400" />
        </p>
      </div>
      <div className="sm:col-span-2">
        <p className="text-white/40">Items</p>
        <ul className="mt-1 space-y-1 text-white/80">
          {order.items.map((item) => (
            <li key={`${order._id}-${item.menuId || item.name}`}>
              {item.quantity}× {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="pt-1">
      <Link to={`/orders/${order._id}`}>
        <Button className="w-full sm:w-auto">
          {order.status === 'DELIVERED' ? 'View order' : 'Track order'}
        </Button>
      </Link>
    </div>
  </article>
);
