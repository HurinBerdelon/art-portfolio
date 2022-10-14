import { FileUpload, GraphQLUpload } from "graphql-upload";
import { container, } from "tsyringe";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { createWriteStream } from 'fs'
import fs from 'fs'

import { Art } from "../models/Art";
import { FindAllArtsUseCase } from "../useCases/FindAllArts/FindAllArtsUseCase";
import { FindArtByIdUseCase } from "../useCases/FindArtById/FindArtByIdUseCase";
import { CreateArtUseCase } from "../useCases/CreateArt/CreateArtUseCase";
import { getHashFilename, tmpFolder } from "../../../config/upload";
import { EditArtUseCase } from "../useCases/EditArt/EditArtUseCase";
import { DeleteArtUseCase } from "../useCases/DeleteArt/DeleteArtUseCase";
import { FindArtsByCategory } from "../useCases/FindArtsByCategory/FindArtsByCategoryUseCase";
import { EditArtImageUseCase } from "../useCases/EditArtImage/EditArtImageUseCase";
import { FindPaginatedArtsUseCase } from "../useCases/FindPaginatedArts/FindPaginatedArtsUseCase";
import { GetNumberOfArtsUseCase } from "../useCases/GetNumberOfArts/GetNumberOfArtsUseCase";

@Resolver()
export class ArtResolver {

    @Query(() => [Art])
    async arts() {
        const findAllArtsUseCase = container.resolve(FindAllArtsUseCase)

        const arts = await findAllArtsUseCase.execute()

        return arts
    }

    @Query(() => Number)
    async numberOfArts(
        @Arg('categoryTitle') categoryTitle: string
    ) {
        const getNumberOfArtsUseCase = container.resolve(GetNumberOfArtsUseCase)

        const numberOfArts = await getNumberOfArtsUseCase.execute(categoryTitle)

        return numberOfArts
    }

    @Query(() => [Art])
    async artsPaginated(
        @Arg('skip') skip: number,
        @Arg('take') take: number,
    ) {
        const findPaginatedArtsUseCase = container.resolve(FindPaginatedArtsUseCase)

        const arts = await findPaginatedArtsUseCase.execute(skip, take)

        return arts
    }

    @Query(() => [Art])
    async artsByCategory(
        @Arg('category') category: string,
        @Arg('skip') skip: number,
        @Arg('take') take: number,
    ) {

        const findArtsByCategory = container.resolve(FindArtsByCategory)

        const arts = await findArtsByCategory.execute(category, skip, take)

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

    @Mutation(() => Art)
    async saveArt(
        @Arg('title') title: string,
        @Arg('category') category: string,
        @Arg('dimension') dimension: string,
        @Arg('description') description: string,
        @Arg('uniqueCode') uniqueCode: string,
        @Arg('productionDate') productionDate: Date,
        @Arg("file", () => GraphQLUpload) { createReadStream, filename }: FileUpload
    ) {

        const hashFilename = getHashFilename(filename)

        const imagePath = `${tmpFolder}/${hashFilename}`

        await new Promise(async (resolve, reject) => {
            createReadStream()
                .pipe(createWriteStream(imagePath))
                .on('finish', () => {
                    resolve(true)
                })
                .on('error', (error) => {
                    console.log('error:', error)
                    reject(false)
                })
        })

        const createArtUseCase = container.resolve(CreateArtUseCase)

        const art = await createArtUseCase.execute({
            dimension,
            categoryTitle: category,
            image: hashFilename,
            title,
            uniqueCode,
            description,
            productionDate
        })

        return

        return art
    }

    @Mutation(() => Art)
    async updateArt(
        @Arg('id') id: string,
        @Arg('title') title: string,
        @Arg('category') category: string,
        @Arg('dimension') dimension: string,
        @Arg('description') description: string,
        @Arg('uniqueCode') uniqueCode: string,
        @Arg('productionDate') productionDate: Date
    ) {

        const editArtUseCase = container.resolve(EditArtUseCase)

        const art = await editArtUseCase.execute({
            id,
            title,
            uniqueCode,
            categoryTitle: category,
            dimension,
            description,
            productionDate
        })

        return art
    }

    @Mutation(() => Art)
    async updateArtImage(
        @Arg('id') id: string,
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

        const editArtImageUseCase = container.resolve(EditArtImageUseCase)

        const art = await editArtImageUseCase.execute(id, hashFilename)

        return art
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
