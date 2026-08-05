import { FoodCard } from './FoodCard';

export const FoodGrid = ({ foods }) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
    {foods.map((food, index) => (
      <div
        key={food._id}
        className="animate-fade-up"
        style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      >
        <FoodCard food={food} />
      </div>
    ))}
  </div>
);
