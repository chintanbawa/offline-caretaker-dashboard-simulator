import type { z } from 'zod';
import type { commandSchema } from './validationService';

type CommandInput = z.infer<typeof commandSchema>;

export function handleCommand(input: CommandInput) {
  if (input.type === 'RESTART_MODULE') {
    return {
      success: true,
      message: `Module restart requested for ${input.payload.module}`
    };
  }

  return {
    success: false,
    message: 'Unsupported command'
  };
}
