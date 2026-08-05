import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { Modal } from '../ui/Modal';
import { Cart } from '../cart/Cart';
import { Button } from '../ui/Button';

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
  }`;

export const Navbar = () => {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-orange-100/80 bg-white/90 backdrop-blur">
        <div className="container-app flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-black text-white shadow-sm">
              FB
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Fresh<span className="text-brand-600">Bite</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/checkout" className={linkClass}>
              Checkout
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="relative"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              <NavLink to="/" className={linkClass} end onClick={() => setMobileOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/checkout"
                className={linkClass}
                onClick={() => setMobileOpen(false)}
              >
                Checkout
              </NavLink>
            </div>
          </nav>
        ) : null}
      </header>

      <Modal open={cartOpen} title="Your cart" onClose={() => setCartOpen(false)}>
        <Cart onClose={() => setCartOpen(false)} />
      </Modal>
    </>
  );
};
