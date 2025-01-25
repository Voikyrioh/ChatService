import { ChatMessage } from './chat.dto'
import { WSChatConnectorMessage } from '../../../libraries/ChatWebSocket/src/ChatMessage'

export class ChatRoom {
  constructor(private readonly roomId: string, private users: Map<string, WebSocket> = new Map()) {}

  public addToRoom(userId: string, user: WebSocket, username: string) {
    this.users.set(userId, user);
    this.broadcast(WSChatConnectorMessage.create('server_broadcast', {
      time: (new Date()).toISOString(),
      message: `${username} a rejoint le chat`,
    }), {});
  }

  public removeFromRoom(userId: string, username) {
    this.users.delete(userId)
    this.broadcast(WSChatConnectorMessage.create('server_broadcast', {
      time: (new Date()).toISOString(),
      message: `${username} a quitté le chat`,
    }), {});
  }

  private broadcast(message: WSChatConnectorMessage, options: { self?: boolean, userId?: string }) {
    const broadcastMessageString = JSON.stringify(message);

    this.users.forEach((user, key) => {
      if (user.readyState !== WebSocket.OPEN) return;
      if (!options.self && key === options.userId) return;
      user.send(broadcastMessageString);
    });
  }

  public shareMessage(message: ChatMessage, userId: string) {
    this.broadcast(WSChatConnectorMessage.create('user_message', {
      time: message.date.toISOString(),
      message: message.message,
      username: message.username,
    }), { self: false, userId});
  }
}
