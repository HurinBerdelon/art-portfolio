import { inject, injectable } from 'tsyringe';
import { IUserRepository, updateUserDTO } from '../../repositories/IUserRepository';

@injectable()
export class UpdateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
    ) { }

    async execute(id: string, data: updateUserDTO): Promise<void> {
        await this.usersRepository.update(id, data)
    }
}