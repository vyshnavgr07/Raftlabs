import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="mt-auto border-t border-white/10 bg-[#0c0b09] text-white">
    <div className="container-app flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-end">
      <div>
        <p className="font-display text-2xl font-bold tracking-tight">
          Fresh<span className="text-brand-400">Bite</span>
        </p>
        <p className="mt-2 max-w-sm text-sm text-white/60">
          Fresh food. Fast delivery. Live order tracking from kitchen to doorstep.
        </p>
      </div>
      <div className="flex flex-col items-start gap-3 sm:items-end">
        <Link
          to="/menu"
          className="text-sm font-medium text-white/70 transition hover:text-brand-300"
        >
          Back to menu
        </Link>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} FreshBite. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
