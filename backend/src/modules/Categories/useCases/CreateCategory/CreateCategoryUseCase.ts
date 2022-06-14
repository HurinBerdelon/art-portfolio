import { Category } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

@injectable()
export class CreateCategoryUseCase {

    constructor(
        @inject('CategoriesRepository')
        private categoryRepository: ICategoryRepository
    ) { }

    async execute(title: string): Promise<Category> {
        const category = await this.categoryRepository.create(title)
        return category
    }
}