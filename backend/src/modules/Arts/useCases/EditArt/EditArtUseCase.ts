import { inject, injectable } from 'tsyringe';
import { Art } from '../../models/Art';
import { IArtsRepository } from '../../repositories/IArtsRepository';

@injectable()
export class EditArtUseCase {
    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute({ id, title, category, dimension, uniqueCode, description, productionDate }: Art): Promise<void> {

        const art = await this.artsRepository.getArtById(id)
        const artWithCode = await this.artsRepository.getArtByUniqueCode(uniqueCode)

        if (!art) {
            throw new Error('Art not Found!')
        }

        if (artWithCode && (art.id != artWithCode.id)) {
            throw new Error(`Code: ${uniqueCode} is already taken for another art`)
        }

        await this.artsRepository.updateArt({
            id,
            title,
            category,
            dimension,
            description,
            productionDate,
            uniqueCode
        })
    }
}