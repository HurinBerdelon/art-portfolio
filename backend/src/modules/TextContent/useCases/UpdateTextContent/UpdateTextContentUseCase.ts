import { TextContent } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITextContentRepository } from '../../repositories/ITextContentRepository';

@injectable()
export class UpdateTextContentUseCase {
    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository
    ) { }

    async execute(id: string, text: string, imageFormat: string): Promise<TextContent> {

        const textContentAlreadyExists = await this.textContentRepository.findById(id)

        if (!textContentAlreadyExists) {
            throw new Error(`TextContent not found`)
        }

        const textContent = await this.textContentRepository.updateText(id, text, imageFormat)

        return textContent
    }
}