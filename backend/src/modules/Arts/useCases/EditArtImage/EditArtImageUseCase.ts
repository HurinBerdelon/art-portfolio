import { Art } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/storageProvider/IStorageProvider';
import { IArtsRepository } from '../../repositories/IArtsRepository';

@injectable()
export class EditArtImageUseCase {
    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    async execute(id: string, image: string): Promise<Art> {

        const artAlreadyExists = await this.artsRepository.getArtById(id)

        if (!artAlreadyExists) {
            throw new Error('Art not Found!')
        }

        const oldImageSplit = artAlreadyExists.image.split('/')
        const oldFilename = oldImageSplit[oldImageSplit.length - 1]

        await this.storageProvider.delete('arts', oldFilename)

        const imageURL = await this.storageProvider.save('arts', image)

        const art = await this.artsRepository.updateArtImage(id, imageURL)

        return art
    }
}