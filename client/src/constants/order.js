export const ORDER_STATUS = Object.freeze({
  ORDER_RECEIVED: 'ORDER_RECEIVED',
  PREPARING: 'PREPARING',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
});

export const ORDER_STATUS_FLOW = Object.freeze([
  ORDER_STATUS.ORDER_RECEIVED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.OUT_FOR_DELIVERY,
  ORDER_STATUS.DELIVERED,
]);

export const STATUS_LABELS = Object.freeze({
  ORDER_RECEIVED: 'Order Received',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
});

export const PAYMENT_METHODS = Object.freeze(['Cash On Delivery', 'Online']);

export const CART_STORAGE_KEY = 'food-order-cart';
