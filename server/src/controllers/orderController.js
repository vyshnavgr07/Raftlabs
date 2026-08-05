import * as orderService from '../services/orderService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/sendSuccess.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.app.locals.onOrderCreated);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: 'Order created successfully',
    data: order,
  });
});

export const getOrders = asyncHandler(async (_req, res) => {
  const orders = await orderService.getOrders();

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: 'Orders fetched successfully',
    data: orders,
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: 'Order fetched successfully',
    data: order,
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status);

  if (typeof req.app.locals.onStatusUpdated === 'function') {
    req.app.locals.onStatusUpdated(order);
  }

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: 'Order status updated successfully',
    data: order,
  });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await orderService.deleteOrder(req.params.id);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: 'Order deleted successfully',
    data: order,
  });
});
