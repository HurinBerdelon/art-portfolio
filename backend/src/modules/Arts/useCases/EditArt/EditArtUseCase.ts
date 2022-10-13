import { Art } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IArtsRepository, updateArtDTO } from '../../repositories/IArtsRepository';

@injectable()
export class EditArtUseCase {
    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute({ id, title, categoryTitle, dimension, uniqueCode, description, productionDate }: updateArtDTO): Promise<Art> {

        const artAlreadyExists = await this.artsRepository.getArtById(id)
        const artWithCode = await this.artsRepository.getArtByUniqueCode(uniqueCode)

        if (!artAlreadyExists) {
            throw new Error('Art not Found!')
        }

        if (artWithCode && (artAlreadyExists.id != artWithCode.id)) {
            throw new Error(`Code: ${uniqueCode} is already taken for another art`)
        }

        const art = await this.artsRepository.updateArt({
            id,
            title,
            categoryTitle,
            dimension,
            description,
            productionDate,
            uniqueCode
        })

        return art
    }
}