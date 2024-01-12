import { Category } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class UpdateCategoryTitleUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute(id: string, title: string): Promise<Category> {

        const categoryAlreadyExists = await this.categoriesRepository.findById(id)

        if (!categoryAlreadyExists) {
            throw new Error(`Category ${title} not Found`)
        }

        const category = await this.categoriesRepository.updateTitle(id, title)

        return category
    }
}