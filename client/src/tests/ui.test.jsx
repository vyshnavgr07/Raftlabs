import { render, screen } from '@testing-library/react';
import { FoodGrid } from '../components/food/FoodGrid';
import { CartProvider } from '../context/CartContext';
import { OrderSummary } from '../components/order/OrderSummary';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';

const foods = [
  {
    _id: '1',
    name: 'Burger',
    description: 'Tasty',
    category: 'Burger',
    image: 'https://example.com/b.jpg',
    price: 9,
    rating: 4,
    preparationTime: 10,
  },
];

describe('UI components', () => {
  test('FoodGrid renders cards', () => {
    render(
      <CartProvider>
        <FoodGrid foods={foods} />
      </CartProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Burger' })).toBeInTheDocument();
  });

  test('OrderSummary shows totals', () => {
    render(
      <OrderSummary
        items={[{ _id: '1', name: 'Burger', quantity: 2, price: 5 }]}
        total={10}
      />,
    );
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
  });

  test('Loader and EmptyState render', () => {
    const { rerender } = render(<Loader label="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();

    rerender(<EmptyState title="Nothing here" description="Try again" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  test('Badge renders children', () => {
    render(<Badge>Hot</Badge>);
    expect(screen.getByText('Hot')).toBeInTheDocument();
  });
});
