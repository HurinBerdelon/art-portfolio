import { Category } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class GetAllCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.findAll()

        return categories
    }
}