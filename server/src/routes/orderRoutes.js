import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import {
  createOrderValidation,
  orderIdValidation,
  updateStatusValidation,
} from '../validations/orderValidation.js';

const orderRouter = Router();

orderRouter.post('/', createOrderValidation, createOrder);
orderRouter.get('/', getOrders);
orderRouter.get('/:id', orderIdValidation, getOrderById);
orderRouter.patch('/:id/status', updateStatusValidation, updateOrderStatus);
orderRouter.delete('/:id', orderIdValidation, deleteOrder);

export default orderRouter;
