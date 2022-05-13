import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/providers/storageProvider/IStorageProvider";
import { Art } from "../../models/Art";
import { IArtsRepository } from "../../repositories/IArtsRepository";

@injectable()
export class CreateArtUseCase {

    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository,
        // @inject('StorageProvider')
        // private storageProvider: IStorageProvider
    ) { }

    async execute({ image, dimension, description, uniqueCode, title, productionDate }: Art): Promise<void> {

        const artAlreadyExistis = await this.artsRepository.getArtByUniqueCode(uniqueCode)

        if (artAlreadyExistis) {
            throw new Error(`Art with code ${uniqueCode} already exists!`)
        }

        // const imageURL = await this.storageProvider.save('pictures', image)

        await this.artsRepository.saveArt({
            title,
            dimension,
            image,
            description,
            uniqueCode,
            productionDate
        })
    }
}