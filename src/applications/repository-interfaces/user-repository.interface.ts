import { User } from '../../domain/entities/User.model'

export interface IUserRepository {
  create(user: User): Promise<boolean>;
  getById(id: string): Promise<User>;
}
