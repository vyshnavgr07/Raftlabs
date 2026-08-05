import { Link, useParams } from 'react-router-dom';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useOrder } from '../hooks/useOrder';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { OrderSummary } from '../components/order/OrderSummary';
import { formatDateTime } from '../utils/format';
import { Currency } from '../components/ui/Currency';

export const OrderSuccessPage = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useOrder(id);

  if (isLoading) return <Loader label="Loading order..." />;

  if (isError || !order) {
    return (
      <div className="container-app py-16">
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
    <div className="container-app py-10 sm:py-14">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1a1714] p-8 text-center text-white shadow-lift sm:p-10 animate-fade-up">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(245,103,18,0.45), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,174,120,0.25), transparent 40%)',
            }}
          />
          <div className="relative">
            <CheckBadgeIcon className="mx-auto h-14 w-14 text-brand-400" />
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Order placed!
            </h1>
            <p className="mt-3 text-white/70">
              Thank you, {order.customer.name}. Your order is confirmed.
            </p>
            <p className="mt-5 text-sm font-medium text-brand-300">Order ID: {order._id}</p>
          </div>
        </div>

        <div className="grid gap-4 surface p-5 shadow-soft sm:grid-cols-2 sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Total paid
            </p>
            <p className="mt-1">
              <Currency value={order.total} className="font-display text-2xl font-bold text-brand-400" />
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Estimated delivery
            </p>
            <p className="mt-1 font-semibold text-white">
              {formatDateTime(order.estimatedDelivery)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Payment</p>
            <p className="mt-1 font-semibold text-white">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Placed at
            </p>
            <p className="mt-1 font-semibold text-white">{formatDateTime(order.createdAt)}</p>
          </div>
        </div>

        <OrderSummary items={order.items} total={order.total} />

        <div className="flex flex-wrap justify-center gap-3">
          <Link to={`/orders/${order._id}`}>
            <Button size="lg">Track order</Button>
          </Link>
          <Link to="/menu">
            <Button variant="secondary" size="lg">
              Back to menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
