import { useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useMenu } from '../hooks/useMenu';
import { FoodGrid } from '../components/food/FoodGrid';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';

export const HomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const params = useMemo(
    () => ({
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(category ? { category } : {}),
      ...(sort ? { sort } : {}),
    }),
    [search, category, sort],
  );

  const { data: allFoods = [] } = useMenu({});
  const { data: foods = [], isLoading, isError, error } = useMenu(params);

  const categories = useMemo(
    () =>
      [...new Set(allFoods.map((food) => food.category).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [allFoods],
  );

  return (
    <div>
      <section className="relative overflow-hidden border-b border-orange-100 bg-gradient-to-br from-brand-600 via-orange-500 to-amber-400 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 0%, white 0, transparent 35%)' }} />
        <div className="container-app relative py-14 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-100">
            Food delivery
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            FreshBite Menu
          </h1>
          <p className="mt-3 max-w-xl text-base text-orange-50 sm:text-lg">
            Order from a curated menu and track your delivery in real time.
          </p>
        </div>
      </section>

      <section className="container-app py-8 sm:py-10">
        <div className="mb-6 grid gap-3 rounded-2xl bg-white p-4 shadow-card md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search dishes..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              aria-label="Search menu"
            />
          </div>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            aria-label="Sort menu"
          >
            <option value="">Sort by</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-rating">Top rated</option>
            <option value="name">Name</option>
          </select>
        </div>

        {isLoading ? <Loader label="Loading menu..." /> : null}

        {isError ? (
          <EmptyState
            title="Unable to load menu"
            description={error?.response?.data?.message || error?.message}
          />
        ) : null}

        {!isLoading && !isError && foods.length === 0 ? (
          <EmptyState
            title="No dishes found"
            description="Try a different search or category filter."
          />
        ) : null}

        {!isLoading && !isError && foods.length > 0 ? <FoodGrid foods={foods} /> : null}
      </section>
    </div>
  );
};
