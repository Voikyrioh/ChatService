import { Message } from '../../domain/entities/Message.model'

export interface IMessageRepository {
  save(message: Message): Promise<string>;
  retrieveHistory(): Promise<{
    message: string;
    username: string;
    date: string; }[]>;
}
