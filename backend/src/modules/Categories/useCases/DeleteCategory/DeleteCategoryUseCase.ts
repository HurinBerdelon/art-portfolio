import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class DeleteCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute(id: string): Promise<void> {
        await this.categoriesRepository.delete(id)
    }
}