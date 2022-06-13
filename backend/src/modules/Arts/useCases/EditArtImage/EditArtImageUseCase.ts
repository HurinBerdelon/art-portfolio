import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/providers/storageProvider/IStorageProvider';
import { Art } from '../../models/Art';
import { IArtsRepository } from '../../repositories/IArtsRepository';

@injectable()
export class EditArtImageUseCase {
    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    async execute({ id, image }: Art): Promise<void> {

        const art = await this.artsRepository.getArtById(id)

        if (!art) {
            throw new Error('Art not Found!')
        }

        const oldImageSplit = art.image.split('/')
        const oldFilename = oldImageSplit[oldImageSplit.length - 1]

        await this.storageProvider.delete('pictures', oldFilename)

        const imageURL = await this.storageProvider.save('pictures', image)

        await this.artsRepository.updateArtImage(id, imageURL)
    }
}