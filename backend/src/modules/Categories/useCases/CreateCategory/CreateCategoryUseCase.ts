import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

@injectable()
export class CreateCategoryUseCase {

    constructor(
        @inject('CategoriesRepository')
        private categoryRepository: ICategoryRepository
    ) { }

    async execute(title: string): Promise<void> {
        await this.categoryRepository.create(title)
    }
}