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
      paymentMethod: formValues.paymentMethod,
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
      <div className="container-app py-12">
        <EmptyState
          title="Nothing to checkout"
          description="Add items to your cart before placing an order."
          action={
            <Link to="/">
              <Button>Back to menu</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-app py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900">Checkout</h1>
        <p className="mt-1 text-slate-500">Confirm your details and place your order.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6">
          <CheckoutForm onSubmit={handleSubmit} isSubmitting={createOrder.isPending} />
        </div>
        <OrderSummary items={items} total={subtotal} />
      </div>
    </div>
  );
};
