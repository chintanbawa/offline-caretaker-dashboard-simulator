import cors from 'cors';
import express from 'express';
import { statusRouter } from './routes/status';
import { logsRouter } from './routes/logs';
import { backupsRouter } from './routes/backups';
import { commandsRouter } from './routes/commands';
import { deployRouter } from './routes/deploy';

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
  app.use('/logs', logsRouter);
  app.use('/backups', backupsRouter);
  app.use('/commands', commandsRouter);
  app.use('/deploy', deployRouter);

  return app;
}
