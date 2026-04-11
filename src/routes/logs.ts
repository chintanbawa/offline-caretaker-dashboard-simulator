import { Router } from 'express';
import { getLogs } from '../services/logsService';

export const logsRouter = Router();

logsRouter.get('/', (_req, res) => {
  res.json(getLogs());
});
