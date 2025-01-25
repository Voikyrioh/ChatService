import { IUserRepository } from '../repository-interfaces/user-repository.interface'
import { User } from '../../domain/entities/User.model'

export class CreateUser {
  constructor(private readonly _repository: IUserRepository) {}

  execute(user: User) {
    return this._repository.create(user);
  }
}
