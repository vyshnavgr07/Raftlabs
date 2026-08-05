import { Link, useParams } from 'react-router-dom';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useOrder } from '../hooks/useOrder';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { OrderSummary } from '../components/order/OrderSummary';
import { formatCurrency, formatDateTime } from '../utils/format';

export const OrderSuccessPage = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useOrder(id);

  if (isLoading) return <Loader label="Loading order..." />;

  if (isError || !order) {
    return (
      <div className="container-app py-12">
        <EmptyState
          title="Order not found"
          description="We could not find this order."
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
    <div className="container-app py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-amber-500 p-8 text-center text-white shadow-lg">
          <CheckBadgeIcon className="mx-auto h-14 w-14" />
          <h1 className="mt-3 text-3xl font-black">Order placed!</h1>
          <p className="mt-2 text-orange-50">
            Thank you, {order.customer.name}. Your order is confirmed.
          </p>
          <p className="mt-4 text-sm font-medium text-orange-100">
            Order ID: {order._id}
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-card sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Total paid</p>
            <p className="text-xl font-bold text-brand-700">{formatCurrency(order.total)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Estimated delivery</p>
            <p className="font-semibold text-slate-800">{formatDateTime(order.estimatedDelivery)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Payment</p>
            <p className="font-semibold text-slate-800">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Placed at</p>
            <p className="font-semibold text-slate-800">{formatDateTime(order.createdAt)}</p>
          </div>
        </div>

        <OrderSummary items={order.items} total={order.total} />

        <div className="flex flex-wrap justify-center gap-3">
          <Link to={`/orders/${order._id}`}>
            <Button size="lg">Track order</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="lg">
              Back to menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
