import { Art } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/providers/storageProvider/IStorageProvider";
import { createArtDTO, IArtsRepository } from "../../repositories/IArtsRepository";

@injectable()
export class CreateArtUseCase {

    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    async execute({ image, categoryTitle, dimension, description, uniqueCode, title, productionDate }: createArtDTO): Promise<Art> {

        console.log('inside useCase')

        const artAlreadyExistis = await this.artsRepository.getArtByUniqueCode(uniqueCode)

        console.log('after calling repository')

        if (artAlreadyExistis) {
            throw new Error(`Art with code ${uniqueCode} already exists!`)
        }

        const imageURL = await this.storageProvider.save('arts', image)

        console.log('after calling storage provider')

        const art = await this.artsRepository.saveArt({
            title,
            categoryTitle,
            dimension,
            image: imageURL,
            description,
            uniqueCode,
            productionDate
        })

        console.log('after saving art in repository')

        return art
    }
}