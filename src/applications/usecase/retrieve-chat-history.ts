import { IMessageRepository } from '../repository-interfaces/message-repository.interface'

interface ChatHistory {
  message: string;
  username: string;
  date: string;
}

export class RetrieveChatHistory {
  constructor(private readonly messageRepository: IMessageRepository) {}

  public async execute(): Promise<ChatHistory[]> {
    try {
      return this.messageRepository.retrieveHistory();
    } catch (e) {
      console.error(e);
    }
  }
}
