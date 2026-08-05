import { STATUS_INTERVAL_MS } from '../constants/orderStatus.js';
import * as orderService from '../services/orderService.js';

const activeSimulators = new Map();

export const emitOrderStatusUpdated = (io, order) => {
  io.emit('orderStatusUpdated', {
    orderId: String(order._id),
    status: order.status,
    order,
  });
};

export const stopStatusSimulator = (orderId) => {
  const key = String(orderId);
  const timer = activeSimulators.get(key);

  if (timer) {
    clearInterval(timer);
    activeSimulators.delete(key);
  }
};

export const startStatusSimulator = (io, orderId) => {
  const key = String(orderId);
  stopStatusSimulator(key);

  const timer = setInterval(async () => {
    try {
      const order = await orderService.getOrderById(key);
      const nextStatus = orderService.getNextStatus(order.status);

      if (!nextStatus) {
        stopStatusSimulator(key);
        return;
      }

      const updated = await orderService.updateOrderStatus(key, nextStatus);
      emitOrderStatusUpdated(io, updated);

      if (!orderService.getNextStatus(updated.status)) {
        stopStatusSimulator(key);
      }
    } catch {
      stopStatusSimulator(key);
    }
  }, STATUS_INTERVAL_MS);

  activeSimulators.set(key, timer);
};

export const initSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinOrder', (orderId) => {
      if (orderId) {
        socket.join(`order:${orderId}`);
      }
    });

    socket.on('leaveOrder', (orderId) => {
      if (orderId) {
        socket.leave(`order:${orderId}`);
      }
    });
  });
};

export const clearAllSimulators = () => {
  activeSimulators.forEach((timer) => clearInterval(timer));
  activeSimulators.clear();
};
