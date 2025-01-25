import {randomUUID} from 'node:crypto'

export class Message {
  constructor(
    public content: string,
    public userId: string,
    public id: string = randomUUID(),
    public createdAt: Date = new Date(),
  ) {}
}
