import { Art } from "@prisma/client";
import { resolve } from "path";
import fs from 'fs'
import { inject, injectable } from "tsyringe";
import { tmpFolder } from "../../../../config/upload";
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

        const artAlreadyExistis = await this.artsRepository.getArtByUniqueCode(uniqueCode)

        if (artAlreadyExistis) {
            const originalName = resolve(tmpFolder, image)
            await fs.promises.unlink(originalName)
            throw new Error(`Art with code ${uniqueCode} already exists!`)
        }

        const imageURL = await this.storageProvider.save('arts', image)

        const art = await this.artsRepository.saveArt({
            title,
            categoryTitle,
            dimension,
            image: imageURL,
            description,
            uniqueCode,
            productionDate
        })

        return art
    }
}