import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class GetUserByIdUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
    ) { }

    async execute(id: string): Promise<User> {
        const user = await this.usersRepository.findById(id)

        return user
    }
}