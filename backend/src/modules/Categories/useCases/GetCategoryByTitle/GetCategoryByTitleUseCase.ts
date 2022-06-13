import { Category } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class GetCategoryByTitleUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute(title: string): Promise<Category> {
        const category = await this.categoriesRepository.findById(title)

        return category

        return
    }
}