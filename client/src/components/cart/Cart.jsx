import { Link } from 'react-router-dom';
import { CartItem } from './CartItem';
import { EmptyState } from '../ui/EmptyState';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/format';
import { useCart } from '../../context/CartContext';

export const Cart = ({ onClose }) => {
  const { items, subtotal, clearCart, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add delicious items from the menu to get started."
        action={
          <Link to="/menu" onClick={onClose}>
            <Button variant="secondary">Browse menu</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
        {items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      <div className="space-y-3 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between text-base font-semibold">
          <span className="text-white">Subtotal</span>
          <span className="font-display text-lg font-bold text-brand-400">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={clearCart}>
            Clear cart
          </Button>
          <Link to="/checkout" onClick={onClose}>
            <Button className="w-full">Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
