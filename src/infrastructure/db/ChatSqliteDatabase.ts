import { Database } from "jsr:@db/sqlite@0.12";

export class ChatSQLiteDatabase {
  public db: Database;
  constructor(public readonly db = new Database('chat.db')) {}

  public async init() {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      username VARCHAR(50) UNIQUE,
      createdAt Date
    )`);

    await this.db.exec(`CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(36) PRIMARY KEY,
      user VARCHAR(36),
      createdAt Date,
      content TEXT,
      FOREIGN KEY(user) REFERENCES users(id)
    );`);

    //await this.db.exec(`INSERT INTO users(id, username, createdAt) VALUES ('d92dbebe-d851-4f47-985f-e24878f2e3f5', 'admin', ?)`, [new Date()]);
  }
}
