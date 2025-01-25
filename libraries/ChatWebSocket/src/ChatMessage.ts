import type { AnyChatMessage, MessageType } from './ChatMessage.types'
import { ChatMessageSchema } from './ChatMessage.schema'
import type {InferChatMessage} from './ChatMessage.schema'

export class WSChatConnectorMessage {
  private constructor(
    public readonly type: MessageType,
    public readonly data: AnyChatMessage['data']
  ) {}

  static parse(message: string): WSChatConnectorMessage {
    try {
      const json = JSON.parse(message);
      const safeParsedMessage = ChatMessageSchema.safeParse(json);
      if (!safeParsedMessage.success) {
        throw new ChatError('Invalid message');
      }
      return new WSChatConnectorMessage(safeParsedMessage.data.type as MessageType, safeParsedMessage.data.data as AnyChatMessage['data']);
    } catch (e) {
      if (e instanceof ChatError) throw e;
      throw new ChatError('Invalid JSON');
    }
  }

  static create(type: MessageType, data: AnyChatMessage['data']): WSChatConnectorMessage {
    try {
      const safePayload: InferChatMessage = ChatMessageSchema.parse({ type, data });
      return new WSChatConnectorMessage(safePayload.type as MessageType, safePayload.data as AnyChatMessage['data']);
    } catch (e) {
      throw new ChatError('Invalid payload');
    }
  }

  static stringify(payload: AnyChatMessage): string {
    try {
      const safePayload: InferChatMessage = ChatMessageSchema.parse(payload);
      return JSON.stringify(safePayload);
    } catch (e) {
      throw new ChatError('Invalid payload');
    }
  }
}

export class ChatError extends Error {
  constructor(message: 'Invalid JSON' | 'Invalid payload' | 'Invalid message') {
    super(message);
    this.name = 'ChatError';
  }
}
