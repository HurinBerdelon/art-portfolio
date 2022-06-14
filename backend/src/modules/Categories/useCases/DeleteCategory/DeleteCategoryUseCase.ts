import { inject, injectable } from 'tsyringe';
import { prisma } from '../../../../services/prisma';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class DeleteCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute(id: string): Promise<void> {
        const category = await prisma.category.findUnique({
            where: {
                id
            },
            include: {
                Art: true
            }
        })

        if (category.Art.length !== 0) {
            throw new Error(`Cannot delete this category, there ${category.Art.length === 1 ? 'is' : 'are'} ${category.Art.length} ${category.Art.length === 1 ? 'Art' : 'Arts'} with this category, delete them before.`)
        }

        await this.categoriesRepository.delete(id)
    }
}