import { Translations } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ITranslationRepository } from "../../repositories/ITranslationRepository";

@injectable()
export class CreateTranslationUseCase {

    constructor(
        @inject('TranslationsRepository')
        private translationsRepository: ITranslationRepository
    ) { }

    async execute(title: string, categoryTitle: string, language: string): Promise<Translations> {
        return await this.translationsRepository.create(title, categoryTitle, language)
    }
}