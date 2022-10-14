import { TextContent } from '@prisma/client';
import fs from 'fs'
import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { tmpFolder } from '../../../../config/upload';
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

        const textContent = await this.textContentRepository.findById(id)

        if (!textContent) {
            const originalName = resolve(tmpFolder, image)
            await fs.promises.unlink(originalName)
            throw new Error('Art not Found!')
        }

        const oldImageSplit = textContent.imageUrl.split('/')
        const oldFilename = oldImageSplit[oldImageSplit.length - 1]

        await this.storageProvider.delete('pictures', oldFilename)

        const imageURL = await this.storageProvider.save('pictures', image)

        const art = await this.textContentRepository.updateImage(id, imageURL)

        return art
    }
}