import { z } from 'zod';

export const commandSchema = z.object({
  type: z.literal('RESTART_MODULE'),
  payload: z.object({
    module: z.string().min(1)
  })
});

export const deploySchema = z.object({
  packageName: z.string().min(1),
  version: z.string().min(1),
  signature: z.string().min(1),
  payload: z.record(z.string(), z.unknown())
});
