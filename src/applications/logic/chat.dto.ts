import { z } from 'zod'

const chatMessageSchemas = z.object({
  username: z.string(),
  message: z.string(),
  date: z.date(),
});

export type ChatMessage = z.infer<typeof chatMessageSchemas>;
