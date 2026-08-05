import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { CART_STORAGE_KEY } from '../constants/order';

const CartContext = createContext(null);

const readStoredCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item._id === action.payload._id);
      if (existing) {
        return state.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item._id !== action.payload);
    case 'INCREASE':
      return state.map((item) =>
        item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
      );
    case 'DECREASE':
      return state
        .map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    case 'CLEAR':
      return [];
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, [], readStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      itemCount,
      subtotal,
      addItem: (food) => dispatch({ type: 'ADD_ITEM', payload: food }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      increaseQuantity: (id) => dispatch({ type: 'INCREASE', payload: id }),
      decreaseQuantity: (id) => dispatch({ type: 'DECREASE', payload: id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
