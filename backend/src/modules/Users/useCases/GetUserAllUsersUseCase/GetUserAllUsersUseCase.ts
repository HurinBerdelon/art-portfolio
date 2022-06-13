import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class GetUserAllUsersUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
    ) { }

    async execute(): Promise<User[]> {
        const users = await this.usersRepository.findAllUsers()

        return users
    }
}