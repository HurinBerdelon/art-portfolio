import { hash } from "bcrypt";
import { container } from "tsyringe";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase/CreateUserUseCase";
import { GetUserAllUsersUseCase } from "../useCases/GetUserAllUsersUseCase/GetUserAllUsersUseCase";
import { UpdateUserUseCase } from "../useCases/UpdateUserUseCase/UpdateUserUseCase";

@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async createUser(
        @Arg('username') username: string,
        @Arg('password') password: string
    ) {
        const createUserUseCase = container.resolve(CreateUserUseCase)

        const user = await createUserUseCase.execute(username, password)

        return user
    }

    @Query(() => [User])
    async getUser() {
        const getUsersUseCase = container.resolve(GetUserAllUsersUseCase)

        const users = await getUsersUseCase.execute()

        if (users.length === 0) {
            const createUserUseCase = container.resolve(CreateUserUseCase)
            const user = await createUserUseCase.execute('admin', await hash('admin', 8))

            return [user]
        }

        return users
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg('id') id: string,
        @Arg('username') username: string,
        @Arg('password') password: string
    ) {
        console.log('hit here')

        const updateUserUseCase = container.resolve(UpdateUserUseCase)

        const data = { username, password: await hash(password, 8) }

        await updateUserUseCase.execute(id, data)

        return true
    }
}