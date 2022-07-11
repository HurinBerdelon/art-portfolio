import { inject, injectable } from 'tsyringe';
import { ITextContentRepository } from '../../repositories/ITextContentRepository';

@injectable()
export class DeleteTextContentUseCase {
    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository
    ) { }

    async execute(id: string): Promise<void> {
        const textContent = await this.textContentRepository.findById(id)

        if (!textContent) {
            throw new Error(`TextContent not found`)
        }

        await this.textContentRepository.delete(id)
    }
}