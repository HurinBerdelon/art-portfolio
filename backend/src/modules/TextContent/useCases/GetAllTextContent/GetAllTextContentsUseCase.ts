import { TextContent } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITextContentRepository } from '../../repositories/ITextContentRepository';

@injectable()
export class GetAllTextContentsUseCase {
    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository
    ) { }

    async execute(): Promise<TextContent[]> {
        const textContents = await this.textContentRepository.findAll()

        return textContents
    }
}