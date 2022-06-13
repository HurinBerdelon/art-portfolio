import { Category } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class GetCategoryByIdUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute(id: string): Promise<Category> {
        const category = await this.categoriesRepository.findById(id)

        return category
    }
}