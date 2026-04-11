import { Router } from 'express';
import { getBackups } from '../services/backupsService';

export const backupsRouter = Router();

backupsRouter.get('/', (_req, res) => {
  res.json(getBackups());
});
