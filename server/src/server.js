import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import {
  initSocket,
  startStatusSimulator,
  emitOrderStatusUpdated,
} from './socket/orderSocket.js';

const startServer = async () => {
  await connectDB();

  const app = createApp();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: env.clientUrl,
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
    },
  });

  initSocket(io);

  app.locals.onOrderCreated = (order) => {
    startStatusSimulator(io, order._id);
    emitOrderStatusUpdated(io, order);
  };

  app.locals.onStatusUpdated = (order) => {
    emitOrderStatusUpdated(io, order);
  };

  server.listen(env.port, () => {
    // Startup confirmation is intentional for ops visibility
    process.stdout.write(`Server running on port ${env.port}\n`);
  });
};

startServer().catch((error) => {
  process.stderr.write(`Failed to start server: ${error.message}\n`);
  process.exit(1);
});
