import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

export const QuantityButton = ({ quantity, onIncrease, onDecrease }) => (
  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
    <Button
      variant="ghost"
      size="sm"
      className="!px-2 !py-1"
      onClick={onDecrease}
      aria-label="Decrease quantity"
    >
      <MinusIcon className="h-4 w-4" />
    </Button>
    <span className="min-w-6 text-center text-sm font-semibold">{quantity}</span>
    <Button
      variant="ghost"
      size="sm"
      className="!px-2 !py-1"
      onClick={onIncrease}
      aria-label="Increase quantity"
    >
      <PlusIcon className="h-4 w-4" />
    </Button>
  </div>
);
