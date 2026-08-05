import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import { CART_STORAGE_KEY } from '../constants/order';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

const item = {
  _id: 'x1',
  name: 'Fries',
  price: 3,
  image: 'https://example.com/f.jpg',
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('supports add, increase, decrease, remove, and clear', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(item));
    expect(result.current.itemCount).toBe(1);

    act(() => result.current.addItem(item));
    expect(result.current.items[0].quantity).toBe(2);

    act(() => result.current.increaseQuantity('x1'));
    expect(result.current.items[0].quantity).toBe(3);

    act(() => result.current.decreaseQuantity('x1'));
    expect(result.current.items[0].quantity).toBe(2);

    act(() => result.current.removeItem('x1'));
    expect(result.current.items).toHaveLength(0);

    act(() => result.current.addItem(item));
    act(() => result.current.clearCart());
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY))).toEqual([]);
  });

  test('throws outside provider', () => {
    expect(() => renderHook(() => useCart())).toThrow(/must be used within CartProvider/i);
  });
});
