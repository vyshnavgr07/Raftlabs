import { TrashIcon } from '@heroicons/react/24/outline';
import { QuantityButton } from './QuantityButton';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/format';
import { useCart } from '../../context/CartContext';

export const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
      <img
        src={item.image}
        alt={item.name}
        className="h-20 w-20 shrink-0 rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="truncate font-semibold text-white">{item.name}</h4>
            <p className="text-sm font-medium text-brand-400">{formatCurrency(item.price)}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="!px-2 text-red-400"
            onClick={() => removeItem(item._id)}
            aria-label={`Remove ${item.name}`}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <QuantityButton
            quantity={item.quantity}
            onIncrease={() => increaseQuantity(item._id)}
            onDecrease={() => decreaseQuantity(item._id)}
          />
          <p className="text-sm font-bold text-white">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};
