import cors from 'cors';
import express from 'express';
import { statusRouter } from './routes/status';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'device-simulator',
      timestamp: new Date().toISOString()
    });
  });

  app.use('/status', statusRouter);

  return app;
}
