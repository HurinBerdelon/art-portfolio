import { inject, injectable } from 'tsyringe';
import { IArtsRepository, updateArtDTO } from '../../repositories/IArtsRepository';

@injectable()
export class EditArtUseCase {
    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute({ id, title, categoryTitle, dimension, uniqueCode, description, productionDate }: updateArtDTO): Promise<void> {

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
            categoryTitle,
            dimension,
            description,
            productionDate,
            uniqueCode
        })
    }
}