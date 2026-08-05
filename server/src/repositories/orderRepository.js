import { Order } from '../models/Order.js';

export const createOrder = async (orderData) => {
  const order = await Order.create(orderData);
  return order.toObject();
};

export const findAllOrders = async () => Order.find().sort({ createdAt: -1 }).lean();

export const findOrderById = async (id) => Order.findById(id).lean();

export const updateOrderStatus = async (id, status) =>
  Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean();

export const deleteOrderById = async (id) => Order.findByIdAndDelete(id).lean();
