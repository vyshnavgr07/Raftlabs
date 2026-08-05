import { Router } from 'express';
import menuRouter from './menuRoutes.js';
import orderRouter from './orderRoutes.js';

const apiRouter = Router();

apiRouter.use('/menu', menuRouter);
apiRouter.use('/orders', orderRouter);

apiRouter.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'OK', data: { status: 'healthy' } });
});

export default apiRouter;
