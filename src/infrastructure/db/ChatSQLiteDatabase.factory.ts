import { ChatSQLiteDatabase } from './ChatSqliteDatabase'

class ChatSQLiteDatabaseFactory {
  #instance: ChatSQLiteDatabase;
  #instanceInit: Promise<void>;

  constructor() {
    this.#instance = new ChatSQLiteDatabase();
    this.#instanceInit = this.#instance.init();
  }

  async getInstance(): Promise<ChatSQLiteDatabase> {
    return this.#instanceInit.then(() => this.#instance);
  }
}

export default new ChatSQLiteDatabaseFactory();
