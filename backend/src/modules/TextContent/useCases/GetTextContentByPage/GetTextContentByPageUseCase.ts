import { TextContent } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITextContentRepository } from '../../repositories/ITextContentRepository';

@injectable()
export class GetTextContentByPageUseCase {
    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository
    ) { }

    async execute(page: string): Promise<TextContent[]> {
        const textContents = await this.textContentRepository.findByPage(page)

        return textContents
    }
}