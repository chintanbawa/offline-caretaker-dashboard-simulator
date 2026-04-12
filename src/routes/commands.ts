import { Router } from 'express';
import { handleCommand } from '../services/commandService';
import { commandSchema } from '../services/validationService';

export const commandsRouter = Router();

commandsRouter.post('/', (req, res) => {
  const parsed = commandSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid command payload',
      issues: parsed.error.flatten()
    });
  }

  const result = handleCommand(parsed.data);
  return res.json(result);
});
