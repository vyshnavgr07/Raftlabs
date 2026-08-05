import { useEffect, useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useMenu } from '../hooks/useMenu';
import { FoodGrid } from '../components/food/FoodGrid';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Pagination } from '../components/ui/Pagination';

const PAGE_SIZE = 8;

export const MenuPage = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, sort]);

  const params = useMemo(
    () => ({
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(category ? { category } : {}),
      ...(sort ? { sort } : {}),
    }),
    [debouncedSearch, category, sort],
  );

  const { data: allFoods = [] } = useMenu({});
  const { data: foods = [], isLoading, isFetching, isError, error } = useMenu(params);
  const showLoader = isLoading || isFetching;

  const categories = useMemo(
    () =>
      [...new Set(allFoods.map((food) => food.category).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [allFoods],
  );

  const totalPages = Math.max(1, Math.ceil(foods.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedFoods = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return foods.slice(start, start + PAGE_SIZE);
  }, [foods, currentPage]);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-app py-10 sm:py-14">
      <div className="mb-8 animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
          FreshBite kitchen
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          The menu
        </h1>
        <p className="mt-2 max-w-lg text-white/60">
          Fresh picks from the kitchen — filter by craving or search by name.
        </p>
      </div>

      <div className="mb-8 grid gap-3 surface p-3 shadow-soft md:grid-cols-[1fr_auto_auto] md:p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search dishes..."
            className="field pl-11"
            aria-label="Search menu"
          />
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="field md:min-w-[11rem]"
          aria-label="Filter by category"
          disabled={showLoader}
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
          className="field md:min-w-[11rem]"
          aria-label="Sort menu"
          disabled={showLoader}
        >
          <option value="">Sort by</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-rating">Top rated</option>
          <option value="name">Name</option>
        </select>
      </div>

      {showLoader ? (
        <Loader label={isLoading ? 'Loading menu...' : 'Updating filters...'} />
      ) : null}

      {!showLoader && isError ? (
        <EmptyState
          title="Unable to load menu"
          description={error?.response?.data?.message || error?.message}
        />
      ) : null}

      {!showLoader && !isError && foods.length === 0 ? (
        <EmptyState
          title="No dishes found"
          description="Try a different search or category filter."
        />
      ) : null}

      {!showLoader && !isError && foods.length > 0 ? (
        <>
          <FoodGrid foods={paginatedFoods} />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            totalItems={foods.length}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        </>
      ) : null}
    </div>
  );
};
