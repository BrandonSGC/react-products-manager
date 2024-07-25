import { z } from 'zod';

export const DraftProductSchema = z.object({
  name: z.string(),
  price: z.number(),
});

