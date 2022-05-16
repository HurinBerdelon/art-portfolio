import { FileUpload, GraphQLUpload } from "graphql-upload";
import { container, } from "tsyringe";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createWriteStream } from 'fs'

import { Art } from "../models/Art";
import { FindAllArtsUseCase } from "../useCases/FindAllArts/FindAllArtsUseCase";
import { FindArtByIdUseCase } from "../useCases/FindArtById/FindArtByIdUseCase";
import { CreateArtUseCase } from "../useCases/CreateArt/CreateArtUseCase";
import { getHashFilename, tmpFolder } from "../../../config/upload";
import { EditArtUseCase } from "../useCases/EditArt/EditArtUseCase";
import { DeleteArtUseCase } from "../useCases/DeleteArt/DeleteArtUseCase";

@Resolver()
export class ArtResolver {

    @Query(() => [Art])
    async arts() {
        const findAllArtsUseCase = container.resolve(FindAllArtsUseCase)

        const arts = await findAllArtsUseCase.execute()

        return arts
    }

    @Query(() => Art)
    async artById(
        @Arg('id') id: string
    ) {
        const findArtByIdUseCase = container.resolve(FindArtByIdUseCase)

        const art = await findArtByIdUseCase.execute(id)

        return art
    }

    @Mutation(() => Boolean)
    async saveArt(
        @Arg('title') title: string,
        @Arg('dimension') dimension: string,
        @Arg('description') description: string,
        @Arg('uniqueCode') uniqueCode: string,
        @Arg('productionDate') productionDate: Date,
        @Arg("file", () => GraphQLUpload) { createReadStream, filename }: FileUpload
    ) {

        const hashFilename = getHashFilename(filename)

        const imagePath = `${tmpFolder}/${hashFilename}`

        await new Promise(async (resolve, reject) =>
            createReadStream()
                .pipe(createWriteStream(imagePath))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        )

        const createArtUseCase = container.resolve(CreateArtUseCase)

        await createArtUseCase.execute({
            dimension,
            image: `http://localhost:4000/images/${hashFilename}`,
            title,
            uniqueCode,
            description,
            productionDate
        })

        return true
    }

    @Mutation(() => Boolean)
    async updateArt(
        @Arg('title') title: string,
        @Arg('dimension') dimension: string,
        @Arg('description') description: string,
        @Arg('uniqueCode') uniqueCode: string,
        @Arg('productionDate') productionDate: Date
    ) {

        const editArtUseCase = container.resolve(EditArtUseCase)

        await editArtUseCase.execute({
            dimension,
            title,
            uniqueCode,
            description,
            productionDate
        })

        return true
    }

    @Query(() => Boolean)
    async deleteArt(
        @Arg('id') id: string
    ) {

        const deleteArtUseCase = container.resolve(DeleteArtUseCase)

        await deleteArtUseCase.execute(id)

        return true
    }
}
