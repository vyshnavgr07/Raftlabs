import { StarIcon, ClockIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Currency } from '../ui/Currency';
import { useCart } from '../../context/CartContext';

export const FoodCard = ({ food }) => {
  const { addItem, isInCart, openCart } = useCart();
  const inCart = isInCart(food._id);

  const handleAdd = () => {
    addItem(food);
    toast.success(`${food.name} added to cart`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1f1b17] shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#2a2622]">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge>{food.category}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-1.5">
          <h3 className="font-display text-lg font-bold tracking-tight text-white">
            {food.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-white/55">
            {food.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 text-sm text-white/70">
          <span className="inline-flex items-center gap-1 font-medium">
            <StarIcon className="h-4 w-4 text-amber-400" />
            {food.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-4 w-4 text-brand-400" />
            {food.preparationTime} min
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <Currency value={food.price} className="text-xl font-bold text-brand-400" />
          {inCart ? (
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5"
              onClick={openCart}
            >
              <ShoppingBagIcon className="h-4 w-4" />
              Go to cart
            </Button>
          ) : (
            <Button onClick={handleAdd} size="sm" className="gap-1.5">
              <PlusIcon className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
