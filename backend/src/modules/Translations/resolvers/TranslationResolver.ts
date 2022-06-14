import { container } from "tsyringe";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Translation } from "../models/Translation";
import { CreateTranslationUseCase } from "../useCases/CreateTranslation/CreateTranslationUseCase";
import { UpdateTranslationTitleUseCase } from "../useCases/UpdateTranslation/UpdateTranslationTitleUseCase";


@Resolver()
export class TranslationResolver {

    @Mutation(() => Translation)
    async updateTranslation(
        @Arg('id') id: string,
        @Arg('title') title: string,
        @Arg('language') language: string,
        @Arg('categoryTitle') categoryTitle: string,
    ) {

        // if ID is a valid ID, it means the translation already exists, so we just update it title
        if (id !== "undefined") {
            const updateTranslationUseCase = container.resolve(UpdateTranslationTitleUseCase)

            const translation = await updateTranslationUseCase.execute(id, title)
            return translation
        }
        // If the ID is undefined, it means the translation does not exists yet, so creates it
        else if (title && language && categoryTitle) {

            const createTranslationUseCase = container.resolve(CreateTranslationUseCase)

            const translation = await createTranslationUseCase.execute(title, language, categoryTitle)
            return translation
        }
        // If title, language and category is undefined, throw an error
        else {
            throw new Error('Cannot create this translation')
        }


    }
}