import { z } from 'zod'

const createMessageSchema = z.object({
  content: z.string().min(1),
  userId: z.string().uuid(),
});

const usernameSchema = z.string().min(1);

export const validateMessagePayload: (data: Object) => z.infer<typeof createMessageSchema> = createMessageSchema.parse;
export const validateUsernamePayload: (data: unknown) => z.infer<typeof usernameSchema> = usernameSchema.parse;
