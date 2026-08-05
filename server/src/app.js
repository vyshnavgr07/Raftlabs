import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { env } from './config/env.js';

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: '*' }));

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  if (env.nodeEnv !== 'test') {
    app.use(morgan('dev'));
  }

  app.get('/', (_req, res) => {
    res.json({
      success: true,
      message: 'Food Order Management API',
      data: { version: '1.0.0' },
    });
  });

  app.use('/api', apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
