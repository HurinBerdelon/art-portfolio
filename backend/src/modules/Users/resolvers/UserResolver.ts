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

        return users
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg('id') id: string,
        @Arg('username') username: string,
        @Arg('password') password: string
    ) {
        const updateUserUseCase = container.resolve(UpdateUserUseCase)

        const data = { username, password }

        await updateUserUseCase.execute(id, data)

        return true
    }
}