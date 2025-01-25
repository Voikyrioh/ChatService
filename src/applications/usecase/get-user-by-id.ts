import { IUserRepository } from '../repository-interfaces/user-repository.interface'
import { User } from '../../domain/entities/User.model'

export class GetUserById {
  constructor(private readonly _repository: IUserRepository) {}

  execute(id: string): Promise<User> {
    return this._repository.getById(id);
  }
}
