import { Translations } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITranslationRepository } from '../../repositories/ITranslationRepository';

@injectable()
export class GetTranslationByCategoryUseCase {
    constructor(
        @inject('TranslationsRepository')
        private translationsRepository: ITranslationRepository
    ) { }

    async execute(categoryTitle: string): Promise<Translations> {
        const translations = await this.translationsRepository.findByCategory(categoryTitle)

        return translations
    }
}