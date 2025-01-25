import { IMessageRepository } from '../../../applications/repository-interfaces/message-repository.interface'
import { Message } from '../../../domain/entities/Message.model'
import ChatSQLiteDatabaseFactory from '../../db/ChatSQLiteDatabase.factory'


class ChatMessageRepositorySqlite implements IMessageRepository {
  private _connection
  constructor() {
    ChatSQLiteDatabaseFactory.getInstance().then(inst => this._connection = inst);
  }

  public async save(message: Message): Promise<string> {
    if(!this._connection) return;
    return this._connection.db
      .prepare(`
        INSERT INTO messages (id, user, createdAt, content) VALUES (?, ?, ?, ?)
      `)
      .run([
        message.id,
        message.userId,
        message.createdAt,
        message.content
    ]);
  }

  public async retrieveHistory(): Promise<{
    message: string;
    username: string;
    date: string;
  }[]> {
    if(!this._connection) return;
    return this._connection.db
      .prepare(`SELECT messages.content as message, users.username, messages.createdAt as date FROM messages INNER JOIN users ON users.id = messages.user`)
      .all();
  }
}

export default new ChatMessageRepositorySqlite();
