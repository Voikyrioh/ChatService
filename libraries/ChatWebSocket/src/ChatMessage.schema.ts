import z from 'zod'

export const userMessageSchema = z.object({
  type: z.enum(['user_message']),
  data: z.object({
    username: z.string(),
    message: z.string(),
    time: z.string(),
  })
});

export const userNewMessageSchema = z.object({
  type: z.enum(['user_new_message']),
  data: z.object({
    user_id: z.string(),
    message: z.string(),
    time: z.string(),
  })
});

export const serverBroadCastSchema = z.object({
  type: z.enum(['server_broadcast']),
  data: z.object({
    message: z.string(),
    time: z.string(),
  })
});

export const serverInformationSchema = z.object({
  type: z.enum(['server_information']),
  data: z.object({
    message: z.string(),
    time: z.string(),
  })
});

export const protocolLoginSchema = z.object({
  type: z.enum(['protocol_login']),
  data: z.object({
    user_id: z.string(),
  })
});

export const protocolRegisterSchema = z.object({
  type: z.enum(['protocol_register']),
  data: z.object({
    username: z.string(),
  })
});

export const protocolLogoutSchema = z.object({
  type: z.enum(['protocol_logout']),
  data: z.object({
    user_id: z.string(),
  })
});

export const serverProtocolSchema = z.object({
  type: z.enum(['protocol_response']),
  data: z.object({
    response: z.enum(['CREATED', 'LOGGED_IN', 'LOGGED_OUT', 'CONNECTION_OK', 'CONNECTION_CLOSED']).nullable(),
    context: z.string().nullable(),
    error: z.enum(['USERNAME_ALREADY_EXIST', 'USER_DOES_NOT_EXIST', 'INTERNAL_ERROR', 'CANNOT_SEND_MESSAGE']).nullable(),
  })
});

export const ChatMessageSchema = z.union([userMessageSchema, userNewMessageSchema, serverBroadCastSchema, serverInformationSchema, protocolLoginSchema, protocolRegisterSchema, protocolLogoutSchema, serverProtocolSchema]);
export type InferChatMessage = z.infer<typeof ChatMessageSchema>;
