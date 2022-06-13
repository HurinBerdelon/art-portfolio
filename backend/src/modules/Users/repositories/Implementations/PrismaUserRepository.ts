import { User } from "@prisma/client";
import { prisma } from "../../../../services/prisma";
import { IUserRepository, updateUserDTO } from "../IUserRepository";

export class PrismaUserRepository implements IUserRepository {

    private userRepository = prisma.user

    async create(username: string, password: string): Promise<User> {
        const user = await this.userRepository.create({
            data: {
                username,
                password
            }
        })

        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findUnique({
            where: {
                id
            }
        })
        return user
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findMany()

        return users
    }

    async update(id: string, data: updateUserDTO): Promise<void> {
        if (data.password) {

            await this.userRepository.update({
                where: { id },
                data: { password: data.password }
            })

        } else if (data.username) {

            await this.userRepository.update({
                where: { id },
                data: { username: data.username }
            })
        }
    }
}