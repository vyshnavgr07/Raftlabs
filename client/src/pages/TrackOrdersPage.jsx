import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useOrders } from '../hooks/useOrders';
import { OrderHistoryCard } from '../components/order/OrderHistoryCard';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export const TrackOrdersPage = () => {
  const [phoneInput, setPhoneInput] = useState('');
  const [phone, setPhone] = useState('');

  const {
    data: orders = [],
    isLoading,
    isFetching,
    isError,
    error,
    isFetched,
  } = useOrders(
    { phone },
    {
      enabled: Boolean(phone),
    },
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextPhone = phoneInput.trim();
    if (!nextPhone) return;
    setPhone(nextPhone);
  };

  const showLoader = Boolean(phone) && (isLoading || isFetching);

  return (
    <div className="container-app py-10 sm:py-14">
      <div className="mb-8 max-w-2xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
          Order history
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Track your orders
        </h1>
        <p className="mt-2 text-white/60">
          Enter the mobile number used at checkout to see older orders and track active ones.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-3 surface p-4 shadow-soft sm:flex-row sm:items-end sm:p-5"
      >
        <label className="block flex-1 space-y-1.5" htmlFor="track-phone">
          <span className="text-sm font-semibold text-white/80">Mobile number</span>
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
            <input
              id="track-phone"
              value={phoneInput}
              onChange={(event) => setPhoneInput(event.target.value)}
              placeholder="e.g. 9876543210"
              className="field pl-11"
              inputMode="tel"
              autoComplete="tel"
              required
            />
          </div>
        </label>
        <Button type="submit" size="lg" className="sm:min-w-[10rem]" disabled={showLoader}>
          {showLoader ? 'Searching...' : 'Find orders'}
        </Button>
      </form>

      {!phone ? (
        <EmptyState
          title="Look up your orders"
          description="Use the same phone number you entered while placing the order."
        />
      ) : null}

      {showLoader ? <Loader label="Finding your orders..." /> : null}

      {!showLoader && phone && isError ? (
        <EmptyState
          title="Unable to find orders"
          description={error?.response?.data?.message || error?.message}
        />
      ) : null}

      {!showLoader && phone && isFetched && !isError && orders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description="We could not find any orders for this mobile number. Check the number and try again."
        />
      ) : null}

      {!showLoader && !isError && orders.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-white/50">
            Found {orders.length} order{orders.length === 1 ? '' : 's'} for {phone}
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            {orders.map((order) => (
              <OrderHistoryCard key={order._id} order={order} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
