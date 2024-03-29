import { Category } from "@prisma/client";
import { prisma } from "../../../../services/prisma";
import { ICategoryRepository } from "../ICategoryRepository";

export class PrismaCategoryRepository implements ICategoryRepository {

    private categoryRepository = prisma.category

    async create(title: string): Promise<Category> {

        const formatedTitle = title.split(' ').join('_').toLowerCase()

        const category = await this.categoryRepository.create({
            data: {
                title: formatedTitle
            },
            include: {
                Translations: true
            }
        })

        return category
    }

    async findById(id: string): Promise<Category> {
        const category = await this.categoryRepository.findUnique({
            where: {
                id
            }
        })

        return category
    }

    async findByTitle(title: string): Promise<Category> {
        const category = await this.categoryRepository.findUnique({
            where: {
                title
            }
        })

        return category
    }

    async findAll(): Promise<Category[]> {
        const categories = await this.categoryRepository.findMany({
            orderBy: {
                createdAt: 'asc'
            },
            include: {
                Translations: true
            }
        })
        return categories
    }

    async updateTitle(id: string, title: string): Promise<Category> {

        const formatedTitle = title.split(' ').join('_').toLowerCase()

        const category = await this.categoryRepository.update({
            where: {
                id
            },
            data: {
                title: formatedTitle
            },
            include: {
                Translations: true
            }
        })
        return category
    }

    async delete(id: string): Promise<void> {
        await this.categoryRepository.delete({
            where: {
                id
            }
        })
    }


}