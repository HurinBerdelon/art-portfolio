import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/storageProvider/IStorageProvider';
import { ITextContentRepository } from '../../repositories/ITextContentRepository';

@injectable()
export class DeleteTextContentUseCase {
    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    async execute(id: string): Promise<void> {
        const textContent = await this.textContentRepository.findById(id)

        if (!textContent) {
            throw new Error(`TextContent not found`)
        }

        const oldImageSplit = textContent.imageUrl.split('/')
        const oldFilename = oldImageSplit[oldImageSplit.length - 1]

        await this.storageProvider.delete('pictures', oldFilename)

        await this.textContentRepository.delete(id)
    }
}