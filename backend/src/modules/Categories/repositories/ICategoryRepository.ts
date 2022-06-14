import { Category } from "@prisma/client"

export interface ICategoryRepository {
    create(title: string): Promise<Category>
    findById(id: string): Promise<Category>
    findByTitle(title: string): Promise<Category>
    findAll(): Promise<Category[]>
    updateTitle(id: string, title: string): Promise<Category>
    delete(id: string): Promise<void>
}