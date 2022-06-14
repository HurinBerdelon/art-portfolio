import { Translations } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITranslationRepository } from '../../repositories/ITranslationRepository';

@injectable()
export class GetTranslationByIdUseCase {
    constructor(
        @inject('TranslationsRepository')
        private translationsRepository: ITranslationRepository
    ) { }

    async execute(id: string): Promise<Translations> {
        const translation = await this.translationsRepository.findById(id)

        return translation
    }
}