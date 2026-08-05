import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FoodCard } from '../components/food/FoodCard';
import { CartProvider } from '../context/CartContext';
import { CART_STORAGE_KEY } from '../constants/order';

const food = {
  _id: '1',
  name: 'Test Burger',
  description: 'A tasty burger',
  category: 'Burger',
  image: 'https://example.com/burger.jpg',
  price: 9.99,
  rating: 4.5,
  preparationTime: 15,
};

const renderCard = () =>
  render(
    <CartProvider>
      <FoodCard food={food} />
    </CartProvider>,
  );

describe('FoodCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders food details', () => {
    renderCard();
    expect(screen.getByText('Test Burger')).toBeInTheDocument();
    expect(screen.getByText('A tasty burger')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
  });

  test('adds item to cart', async () => {
    const user = userEvent.setup();
    renderCard();
    await user.click(screen.getByRole('button', { name: /add/i }));

    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Test Burger');
  });
});
