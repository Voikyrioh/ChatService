import { randomUUID } from 'node:crypto'

export class User {
  constructor(
      public name: string,
      public id: string = randomUUID(),
      public createdAt: Date = new Date()
    ) {
  }
}
