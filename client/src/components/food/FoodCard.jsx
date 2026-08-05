import { StarIcon, ClockIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/format';
import { useCart } from '../../context/CartContext';

export const FoodCard = ({ food }) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(food);
    toast.success(`${food.name} added to cart`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <Badge>{food.category}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">{food.name}</h3>
          <p className="line-clamp-2 text-sm text-slate-500">{food.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1 font-medium">
            <StarIcon className="h-4 w-4 text-amber-400" />
            {food.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-4 w-4 text-brand-500" />
            {food.preparationTime} min
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-xl font-extrabold text-brand-700">{formatCurrency(food.price)}</p>
          <Button onClick={handleAdd} size="sm">
            Add
          </Button>
        </div>
      </div>
    </article>
  );
};
