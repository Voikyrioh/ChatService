import { Message } from '../../domain/entities/Message.model'
import { IMessageRepository } from '../repository-interfaces/message-repository.interface'

export class RegisterMessage {
  constructor(private readonly messageRepository: IMessageRepository) {}

  public async execute(message: Message): Promise<boolean> {
    try {
      await this.messageRepository.save(message);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

