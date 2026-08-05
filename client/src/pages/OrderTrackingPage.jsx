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
      <div className="container-app py-16">
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
    <div className="container-app py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Order tracking
          </h1>
          <p className="mt-2 text-sm text-white/50">Order #{order._id}</p>
        </div>
        <Badge tone="orange">{STATUS_LABELS[order.status] || order.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface p-5 shadow-soft sm:p-6">
          <h2 className="mb-5 font-display text-xl font-bold text-white">Live status</h2>
          <StatusTimeline status={order.status} />
          <p className="mt-5 text-xs text-white/40">
            Status updates automatically every 10 seconds via Socket.io.
          </p>
        </div>

        <div className="space-y-5">
          <div className="surface p-5 shadow-soft sm:p-6">
            <h2 className="font-display text-xl font-bold text-white">Delivery details</h2>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-white/40">Customer</dt>
                <dd className="mt-1 font-semibold text-white">{order.customer.name}</dd>
              </div>
              <div>
                <dt className="text-white/40">Phone</dt>
                <dd className="mt-1 font-semibold text-white">{order.customer.phone}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-white/40">Address</dt>
                <dd className="mt-1 font-semibold text-white">{order.customer.address}</dd>
              </div>
              {order.customer.notes ? (
                <div className="sm:col-span-2">
                  <dt className="text-white/40">Notes</dt>
                  <dd className="mt-1 font-semibold text-white">{order.customer.notes}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-white/40">Created</dt>
                <dd className="mt-1 font-semibold text-white">{formatDateTime(order.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-white/40">Estimated delivery</dt>
                <dd className="mt-1 font-semibold text-white">
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
