import { User } from "@prisma/client"

export interface updateUserDTO {
    username?: string
    password?: string
}

export interface IUserRepository {
    create(username: string, password: string): Promise<User>
    findById(id: string): Promise<User>
    findAllUsers(): Promise<User[]>
    update(id: string, data: updateUserDTO): Promise<void>
}