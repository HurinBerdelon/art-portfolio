import { Art } from "@prisma/client";
import { prisma } from "../../../../services/prisma";
import { createArtDTO, IArtsRepository, updateArtDTO } from "../IArtsRepository";

export class PrismaArtRepository implements IArtsRepository {

    private artRepository = prisma.art

    async saveArt({ title, categoryTitle, description, image, uniqueCode, dimension, productionDate }: createArtDTO): Promise<Art> {
        return await this.artRepository.create({
            data: {
                title,
                categoryTitle,
                dimension,
                image,
                description,
                uniqueCode,
                productionDate
            }
        })
    }

    async getArtById(id: string): Promise<Art> {
        const art = await this.artRepository.findUnique({
            where: {
                id
            }
        })

        return art
    }

    async getArtByUniqueCode(uniqueCode: string): Promise<Art> {
        const art = await this.artRepository.findUnique({
            where: {
                uniqueCode
            }
        })

        return art
    }

    async getArtsByCategory(categoryTitle: string, skip: number, take: number): Promise<Art[]> {
        const arts = await this.artRepository.findMany({
            where: {
                categoryTitle
            },
            orderBy: {
                productionDate: 'desc'
            },
            skip,
            take,

        })

        return arts
    }

    async getPaginatedArts(skip: number, take: number): Promise<Art[]> {
        const arts = await this.artRepository.findMany({
            orderBy: {
                productionDate: 'desc'
            },
            skip,
            take
        })

        return arts
    }

    async getAllArts(): Promise<Art[]> {
        const arts = await this.artRepository.findMany({
            orderBy: {
                productionDate: 'desc'
            },
        })

        return arts
    }

    async getNumberOfArts(categoryTitle: string): Promise<number> {

        if (categoryTitle === 'undefined') return await this.artRepository.count()
        else return await this.artRepository.count({
            where: {
                categoryTitle
            }
        })
    }

    async updateArt({ id, title, categoryTitle, description, dimension, productionDate, uniqueCode }: updateArtDTO): Promise<Art> {
        return await this.artRepository.update({
            where: {
                id
            },
            data: {
                title,
                categoryTitle,
                description,
                dimension,
                productionDate,
                uniqueCode
            }
        })
    }

    async updateArtImage(id: string, image: string): Promise<Art> {
        return await this.artRepository.update({
            where: {
                id
            },
            data: {
                image
            }
        })
    }

    async deleteArt(id: string): Promise<void> {
        await this.artRepository.delete({
            where: {
                id
            }
        })
    }

}