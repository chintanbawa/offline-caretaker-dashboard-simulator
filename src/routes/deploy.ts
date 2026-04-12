import { Router } from 'express';
import { handleDeploy } from '../services/deployService';
import { deploySchema } from '../services/validationService';

export const deployRouter = Router();

deployRouter.post('/', async (req, res) => {
  const parsed = deploySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid deploy payload',
      issues: parsed.error.flatten()
    });
  }

  const result = await handleDeploy(parsed.data);
  return res.status(result.statusCode).json({
    success: result.success,
    message: result.message
  });
});
