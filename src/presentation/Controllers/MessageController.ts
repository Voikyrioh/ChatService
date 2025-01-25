import { RegisterMessage } from '../../applications/usecase/register-message';
import { Message } from '../../domain/entities/Message.model';
import { validateMessagePayload, validateUsernamePayload } from './MessageController.dto'
import messageRepository from '../../infrastructure/repository/sqlite/message.repository';
import userRepository from '../../infrastructure/repository/sqlite/user.repository';
import { RetrieveChatHistory } from '../../applications/usecase/retrieve-chat-history'
import { ChatRoom } from '../../applications/logic/chat-room'
import { CreateUser } from '../../applications/usecase/create-user'
import { User } from '../../domain/entities/User.model'
import { WSChatConnectorMessage } from '../../../libraries/ChatWebSocket/src/ChatMessage'
import {
  ProtocolRegister, ServerProtocol,
  UserNewMessage
} from '../../../libraries/ChatWebSocket/src/ChatMessage.types'
import { GetUserById } from '../../applications/usecase/get-user-by-id'

class MessageController {
  #socket: WebSocket;

  constructor(
    private readonly registerMessage = new RegisterMessage(messageRepository),
    private readonly retrieveHistory = new RetrieveChatHistory(messageRepository),
    private readonly createUser = new CreateUser(userRepository),
    private readonly getUserById = new GetUserById(userRepository),
    private readonly chatRoom = new ChatRoom('chat')
  ) {}

  public async connect(socket: WebSocket) {
    this.#socket = socket;
    this.#socket.on('message', async (data: Buffer) => {
      console.log(data.toString())
      await this.handleMessage(WSChatConnectorMessage.parse(data.toString()))
    });
  }

  private async handleMessage(message: WSChatConnectorMessage) {
    switch (message.type) {
      case 'protocol_register':
        await this.registersUser(message.data as ProtocolRegister['data']);
        break;
      case 'user_new_message':
        await this.createNewMessage(message.data as UserNewMessage['data']);
    }

  }

  private async registersUser(data: ProtocolRegister['data']) {
    const user = new User(validateUsernamePayload(data.username));
    const userCreated = await this.createUser.execute(user);
    if (!userCreated) return;

    const chatLog = await this.retrieveHistory.execute();
    chatLog.forEach(
      (message) => this.#socket.send(WSChatConnectorMessage.stringify({
        type: 'user_message',
        data: {
          message: message.message,
          username: message.username,
          time: message.date
        }
      })))

    this.chatRoom.addToRoom(user.id, this.#socket, user.name)
    this.#socket.send(WSChatConnectorMessage.stringify({
      type: 'protocol_response',
      data: {
        response: 'CREATED',
        context: user.id,
        error: null
      }
    } as ServerProtocol))
  }

  private async createNewMessage(payload: UserNewMessage['data']) {
    const dataObject = validateMessagePayload({
      content: payload.message,
      userId: payload.user_id
    });

    const newMessage = new Message(
      dataObject.content,
      dataObject.userId,
    );

    await this.registerMessage.execute(newMessage);
    const {name: username} = await this.getUserById.execute(dataObject.userId);

    this.chatRoom.shareMessage({
      message: newMessage.content,
      username: username,
      date: newMessage.createdAt
    }, payload.user_id);
  }
}

export default new MessageController();
