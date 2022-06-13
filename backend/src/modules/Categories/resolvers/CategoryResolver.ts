import { container } from "tsyringe";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../models/Category";
import { CreateCategoryUseCase } from "../useCases/CreateCategory/CreateCategoryUseCase";
import { DeleteCategoryUseCase } from "../useCases/DeleteCategory/DeleteCategoryUseCase";
import { GetAllCategoriesUseCase } from "../useCases/GetAllCategories/GetAllCategoriesUseCase";
import { UpdateCategoryTitleUseCase } from "../useCases/UpdateCategory/UpdateCategoryTitleUseCase";

@Resolver()
export class CategoryResolver {

    @Query(() => [Category])
    async getCategories() {

        const getAllCategoriesUseCase = container.resolve(GetAllCategoriesUseCase)

        const categories = await getAllCategoriesUseCase.execute()

        return categories
    }

    @Mutation(() => Boolean)
    async createCategory(
        @Arg('title') title: string
    ) {

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

        await createCategoryUseCase.execute(title)

        return true
    }

    @Mutation(() => Boolean)
    async updateCategory(
        @Arg('id') id: string,
        @Arg('title') title: string
    ) {

        const updateCategoryUseCase = container.resolve(UpdateCategoryTitleUseCase)

        await updateCategoryUseCase.execute(id, title)

        return true
    }

    @Query(() => Boolean)
    async deleteCategory(
        @Arg('id') id: string
    ) {

        const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase)

        await deleteCategoryUseCase.execute(id)

        return true
    }
}