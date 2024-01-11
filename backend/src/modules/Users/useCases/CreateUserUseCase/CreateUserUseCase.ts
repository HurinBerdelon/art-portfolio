import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
    ) { }

    async execute(username: string, password: string): Promise<User> {

        const user = await this.usersRepository.create(username, password)

        return user
    }
}