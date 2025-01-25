import { IUserRepository } from '../../../applications/repository-interfaces/user-repository.interface'
import ChatSQLiteDatabaseFactory from '../../db/ChatSQLiteDatabase.factory'
import { User } from '../../../domain/entities/User.model'
import * as console from 'node:console'
import { undefined } from 'zod'

class UserRepositorySQLite implements IUserRepository {
  private _connection
  constructor() {
    ChatSQLiteDatabaseFactory.getInstance().then(inst => this._connection = inst);
  }

  async create(user: User): Promise<boolean> {
    if(!this._connection) return false;
    try {
      await this._connection.db
        .prepare(`INSERT INTO users (id, username, createdAt) VALUES (?, ?, ?)`)
        .run([user.id, user.name, user.createdAt]);
      return true
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getById(id: string): Promise<User> {
    if(!this._connection) throw new Error('Database connection not found');
    const [dbUser] = this._connection.db
      .prepare(`SELECT id, username, createdAt FROM users WHERE id = ?`)
      .all([id]);
    return new User(dbUser.username, dbUser.id, new Date(dbUser.createdAt));
  }
}

export default new UserRepositorySQLite();
