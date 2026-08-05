import { useNavigate, Link } from 'react-router-dom';
import { CheckoutForm } from '../components/order/CheckoutForm';
import { OrderSummary } from '../components/order/OrderSummary';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useCreateOrder } from '../hooks/useCreateOrder';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const handleSubmit = async (formValues) => {
    const payload = {
      customer: {
        name: formValues.name,
        phone: formValues.phone,
        address: formValues.address,
        notes: formValues.notes || '',
      },
      paymentMethod: 'Paid',
      items: items.map((item) => ({
        menuId: item._id,
        quantity: item.quantity,
      })),
    };

    const order = await createOrder.mutateAsync(payload);
    clearCart();
    navigate(`/orders/${order._id}/success`);
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-16">
        <EmptyState
          title="Nothing to checkout"
          description="Add items to your cart before placing an order."
          action={
            <Link to="/menu">
              <Button>Back to menu</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-app py-10 sm:py-14">
      <div className="mb-8 animate-fade-up">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-white/60">Confirm your details and place your order.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface p-5 shadow-soft sm:p-7">
          <CheckoutForm onSubmit={handleSubmit} isSubmitting={createOrder.isPending} />
        </div>
        <OrderSummary items={items} total={subtotal} />
      </div>
    </div>
  );
};
