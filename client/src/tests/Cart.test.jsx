import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../context/CartContext';
import { Cart as CartPanel } from '../components/cart/Cart';
import { CART_STORAGE_KEY } from '../constants/order';

const seedItem = {
  _id: 'abc',
  name: 'Pizza',
  price: 12,
  image: 'https://example.com/pizza.jpg',
};

const SeedCart = ({ children }) => {
  const { addItem } = useCart();
  return (
    <div>
      <button type="button" onClick={() => addItem(seedItem)}>
        seed
      </button>
      {children}
    </div>
  );
};

describe('Cart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('shows empty state', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <CartPanel onClose={() => {}} />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('persists cart in localStorage and clears', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartProvider>
          <SeedCart>
            <CartPanel onClose={() => {}} />
          </SeedCart>
        </CartProvider>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /seed/i }));
    expect(screen.getByText('Pizza')).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    expect(stored[0].name).toBe('Pizza');

    await user.click(screen.getByRole('button', { name: /clear cart/i }));
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
