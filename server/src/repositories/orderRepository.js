import { Order } from '../models/Order.js';

export const createOrder = async (orderData) => {
  const order = await Order.create(orderData);
  return order.toObject();
};

export const findAllOrders = async () => Order.find().sort({ createdAt: -1 }).lean();

export const findOrdersByPhone = async (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return [];

  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  return orders.filter((order) => {
    const stored = String(order.customer?.phone || '').replace(/\D/g, '');
    if (!stored) return false;
    return stored === digits || stored.endsWith(digits) || digits.endsWith(stored);
  });
};

export const findOrderById = async (id) => Order.findById(id).lean();

export const updateOrderStatus = async (id, status) =>
  Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean();

export const deleteOrderById = async (id) => Order.findByIdAndDelete(id).lean();
