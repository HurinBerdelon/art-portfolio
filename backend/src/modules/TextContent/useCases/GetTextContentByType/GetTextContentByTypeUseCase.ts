import { TextContent } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITextContentRepository } from '../../repositories/ITextContentRepository';

@injectable()
export class GetTextContentByTypeUseCase {
    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository
    ) { }

    async execute(type: string): Promise<TextContent[]> {
        const textContents = await this.textContentRepository.findByType(type)

        return textContents
    }
}