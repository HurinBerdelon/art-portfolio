import { Translations } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITranslationRepository } from '../../repositories/ITranslationRepository';

@injectable()
export class UpdateTranslationTitleUseCase {
    constructor(
        @inject('TranslationsRepository')
        private translationsRepository: ITranslationRepository
    ) { }

    async execute(id: string, title: string): Promise<Translations> {

        const translation = await this.translationsRepository.findById(id)

        if (!translation) {
            throw new Error(`Translation ${title} not Found`)
        }

        return await this.translationsRepository.updateTitle(id, title)
    }
}