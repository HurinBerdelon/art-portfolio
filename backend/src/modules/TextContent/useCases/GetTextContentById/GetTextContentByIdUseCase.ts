import { TextContent } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITextContentRepository } from '../../repositories/ITextContentRepository';

@injectable()
export class GetTextContentByIdUseCase {
    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository
    ) { }

    async execute(id: string): Promise<TextContent> {
        const textContent = await this.textContentRepository.findById(id)

        return textContent
    }
}