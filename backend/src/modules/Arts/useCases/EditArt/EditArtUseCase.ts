import { inject, injectable } from 'tsyringe';
import { Art } from '../../models/Art';
import { IArtsRepository } from '../../repositories/IArtsRepository';

@injectable()
export class EditArtUseCase {
    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute({ id, title, image, dimension, description, productionDate }: Art): Promise<void> {

        const art = await this.artsRepository.getArtById(id)

        if (!art) {
            throw new Error('Art not Found!')
        }

        await this.artsRepository.updateArt({
            id,
            title,
            image,
            dimension,
            description,
            productionDate
        })
    }
}