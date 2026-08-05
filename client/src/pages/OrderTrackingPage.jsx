import { Link, useParams } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';
import { useOrderSocket } from '../hooks/useOrderSocket';
import { StatusTimeline } from '../components/order/StatusTimeline';
import { OrderSummary } from '../components/order/OrderSummary';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { STATUS_LABELS } from '../constants/order';
import { formatDateTime } from '../utils/format';

export const OrderTrackingPage = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useOrder(id);
  useOrderSocket(id);

  if (isLoading) return <Loader label="Tracking your order..." />;

  if (isError || !order) {
    return (
      <div className="container-app py-12">
        <EmptyState
          title="Unable to track order"
          description="This order may have been deleted or the link is invalid."
          action={
            <Link to="/">
              <Button>Go home</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-app py-8 sm:py-10">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Order tracking</h1>
          <p className="mt-1 text-sm text-slate-500">Order #{order._id}</p>
        </div>
        <Badge tone="orange">{STATUS_LABELS[order.status] || order.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Live status</h2>
          <StatusTimeline status={order.status} />
          <p className="mt-4 text-xs text-slate-500">
            Status updates automatically every 10 seconds via Socket.io.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
            <h2 className="text-lg font-bold text-slate-900">Delivery details</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-400">Customer</dt>
                <dd className="font-semibold text-slate-800">{order.customer.name}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Phone</dt>
                <dd className="font-semibold text-slate-800">{order.customer.phone}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-400">Address</dt>
                <dd className="font-semibold text-slate-800">{order.customer.address}</dd>
              </div>
              {order.customer.notes ? (
                <div className="sm:col-span-2">
                  <dt className="text-slate-400">Notes</dt>
                  <dd className="font-semibold text-slate-800">{order.customer.notes}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-slate-400">Created</dt>
                <dd className="font-semibold text-slate-800">{formatDateTime(order.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Estimated delivery</dt>
                <dd className="font-semibold text-slate-800">
                  {formatDateTime(order.estimatedDelivery)}
                </dd>
              </div>
            </dl>
          </div>

          <OrderSummary items={order.items} total={order.total} />
        </div>
      </div>
    </div>
  );
};
