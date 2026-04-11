import { Router } from 'express';
import { getStatus } from '../services/statusService';

export const statusRouter = Router();

statusRouter.get('/', (_req, res) => {
  res.json(getStatus());
});
