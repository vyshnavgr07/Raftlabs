import { Link } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
import { FoodGrid } from '../components/food/FoodGrid';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80';

const PREVIEW_LIMIT = 8;

export const HomePage = () => {
  const { data: foods = [], isLoading, isError, error } = useMenu({});
  const previewFoods = foods.slice(0, PREVIEW_LIMIT);

  return (
    <div>
      <section className="relative min-h-[78vh] overflow-hidden bg-[#12100e] text-white sm:min-h-[85vh]">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-55 animate-scale-in"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(18,16,14,0.95) 0%, rgba(18,16,14,0.72) 45%, rgba(18,16,14,0.35) 100%), linear-gradient(0deg, rgba(18,16,14,0.9) 0%, transparent 45%)',
          }}
        />

        <div className="container-app relative flex min-h-[78vh] flex-col justify-end pb-16 pt-28 sm:min-h-[85vh] sm:pb-24 sm:pt-32">
          <p className="font-display text-4xl font-bold tracking-tight text-white animate-fade-up sm:text-6xl lg:text-7xl">
            FreshBite
          </p>
          <h1 className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight text-white animate-fade-up sm:text-4xl [animation-delay:120ms]">
            Food that arrives hot, tracked live.
          </h1>
          <p className="mt-4 max-w-md text-base text-white/80 animate-fade-up sm:text-lg [animation-delay:220ms]">
            Browse the kitchen menu, order in minutes, and watch every step until your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:320ms]">
            <a
              href="#featured-menu"
              className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              See dishes
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Browse all
            </Link>
          </div>
        </div>
      </section>

      <section id="featured-menu" className="container-app scroll-mt-24 py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 animate-fade-up">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Popular picks
            </h2>
            <p className="mt-2 max-w-lg text-white/60">
              A taste of what’s cooking — explore the full menu anytime.
            </p>
          </div>
          <Link to="/menu">
            <Button variant="secondary">Browse all</Button>
          </Link>
        </div>

        {isLoading ? <Loader label="Loading menu..." /> : null}

        {isError ? (
          <EmptyState
            title="Unable to load menu"
            description={error?.response?.data?.message || error?.message}
          />
        ) : null}

        {!isLoading && !isError && previewFoods.length === 0 ? (
          <EmptyState
            title="No dishes yet"
            description="Check back soon for fresh menu items."
          />
        ) : null}

        {!isLoading && !isError && previewFoods.length > 0 ? (
          <>
            <FoodGrid foods={previewFoods} />
            <div className="mt-10 flex justify-center">
              <Link to="/menu">
                <Button size="lg">Browse all menu</Button>
              </Link>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
};
