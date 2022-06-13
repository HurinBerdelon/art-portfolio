import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

@injectable()
export class UpdateCategoryTitleUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoryRepository
    ) { }

    async execute(id: string, title: string): Promise<void> {

        const category = await this.categoriesRepository.findById(id)

        if (!category) {
            throw new Error(`Category ${title} not Found`)
        }

        await this.categoriesRepository.updateTitle(id, title)
    }
}