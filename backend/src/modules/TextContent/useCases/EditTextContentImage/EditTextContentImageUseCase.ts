import { TextContent } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/storageProvider/IStorageProvider';
import { ITextContentRepository } from '../../repositories/ITextContentRepository';

@injectable()
export class EditTextContentImageUseCase {
    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    async execute(id: string, image: string): Promise<TextContent> {

        const artAlreadyExists = await this.textContentRepository.findById(id)

        if (!artAlreadyExists) {
            throw new Error('Art not Found!')
        }

        const oldImageSplit = artAlreadyExists.imageUrl.split('/')
        const oldFilename = oldImageSplit[oldImageSplit.length - 1]

        await this.storageProvider.delete('pictures', oldFilename)

        const imageURL = await this.storageProvider.save('pictures', image)

        const art = await this.textContentRepository.updateImage(id, imageURL)

        return art
    }
}