import mongoose from 'mongoose';
import * as orderRepository from '../repositories/orderRepository.js';
import * as menuRepository from '../repositories/menuRepository.js';
import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  ORDER_STATUS,
  ORDER_STATUS_FLOW,
  ESTIMATED_DELIVERY_MINUTES,
} from '../constants/orderStatus.js';

const calculateEstimatedDelivery = () => {
  const estimated = new Date();
  estimated.setMinutes(estimated.getMinutes() + ESTIMATED_DELIVERY_MINUTES);
  return estimated;
};

const buildOrderItems = (requestItems, menuItems) => {
  const menuMap = new Map(menuItems.map((item) => [String(item._id), item]));

  return requestItems.map((item) => {
    const menuItem = menuMap.get(String(item.menuId));

    if (!menuItem) {
      throw AppError(`Menu item not found: ${item.menuId}`, HTTP_STATUS.BAD_REQUEST);
    }

    return {
      menuId: menuItem._id,
      name: menuItem.name,
      quantity: item.quantity,
      price: menuItem.price,
    };
  });
};

const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const createOrder = async (payload, onCreated) => {
  const menuIds = payload.items.map((item) => item.menuId);
  const uniqueIds = [...new Set(menuIds.map(String))];

  const invalidId = uniqueIds.find((id) => !mongoose.Types.ObjectId.isValid(id));
  if (invalidId) {
    throw AppError(`Invalid menu id: ${invalidId}`, HTTP_STATUS.BAD_REQUEST);
  }

  const menuItems = await menuRepository.findMenusByIds(uniqueIds);

  if (menuItems.length !== uniqueIds.length) {
    throw AppError('One or more menu items were not found', HTTP_STATUS.BAD_REQUEST);
  }

  const items = buildOrderItems(payload.items, menuItems);
  const total = Number(calculateTotal(items).toFixed(2));

  const order = await orderRepository.createOrder({
    customer: payload.customer,
    items,
    paymentMethod: 'Paid',
    status: ORDER_STATUS.ORDER_RECEIVED,
    total,
    estimatedDelivery: calculateEstimatedDelivery(),
  });

  if (typeof onCreated === 'function') {
    onCreated(order);
  }

  return order;
};

export const getOrders = async (query = {}) => {
  if (query.phone) {
    return orderRepository.findOrdersByPhone(query.phone);
  }

  return orderRepository.findAllOrders();
};

export const getOrderById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError('Invalid order id', HTTP_STATUS.BAD_REQUEST);
  }

  const order = await orderRepository.findOrderById(id);

  if (!order) {
    throw AppError('Order not found', HTTP_STATUS.NOT_FOUND);
  }

  return order;
};

export const updateOrderStatus = async (id, status) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError('Invalid order id', HTTP_STATUS.BAD_REQUEST);
  }

  if (!ORDER_STATUS_FLOW.includes(status)) {
    throw AppError('Invalid order status', HTTP_STATUS.BAD_REQUEST);
  }

  const updated = await orderRepository.updateOrderStatus(id, status);

  if (!updated) {
    throw AppError('Order not found', HTTP_STATUS.NOT_FOUND);
  }

  return updated;
};

export const deleteOrder = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError('Invalid order id', HTTP_STATUS.BAD_REQUEST);
  }

  const deleted = await orderRepository.deleteOrderById(id);

  if (!deleted) {
    throw AppError('Order not found', HTTP_STATUS.NOT_FOUND);
  }

  return deleted;
};

export const getNextStatus = (currentStatus) => {
  const index = ORDER_STATUS_FLOW.indexOf(currentStatus);
  if (index === -1 || index === ORDER_STATUS_FLOW.length - 1) {
    return null;
  }
  return ORDER_STATUS_FLOW[index + 1];
};
