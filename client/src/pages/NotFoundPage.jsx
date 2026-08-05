import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => (
  <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
    <p className="font-display text-7xl font-extrabold text-brand-500">404</p>
    <h1 className="mt-3 font-display text-2xl font-bold text-white">Page not found</h1>
    <p className="mt-2 max-w-md text-white/55">
      The page you are looking for does not exist or may have been moved.
    </p>
    <Link to="/" className="mt-8">
      <Button>Back to home</Button>
    </Link>
  </div>
);
