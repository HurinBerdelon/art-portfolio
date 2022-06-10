import { prisma } from "../../../../services/prisma";
import { Art } from "../../models/Art";
import { ArtCategory } from "../../models/ArtCategory";
import { IArtsRepository } from "../IArtsRepository";

export class PrismaArtRepository implements IArtsRepository {

    private artRepository = prisma

    async saveArt({ title, category, description, image, uniqueCode, dimension, productionDate }: Art): Promise<void> {
        await this.artRepository.art.create({
            data: {
                title,
                category,
                dimension,
                image,
                description,
                uniqueCode,
                productionDate
            }
        })
    }

    async getArtById(id: string): Promise<Art> {
        const art = await this.artRepository.art.findUnique({
            where: {
                id
            }
        })

        return art
    }

    async getArtByUniqueCode(uniqueCode: string): Promise<Art> {
        const art = await this.artRepository.art.findUnique({
            where: {
                uniqueCode
            }
        })

        return art
    }

    async getArtsByCategory(category: string): Promise<Art[]> {
        const arts = await this.artRepository.art.findMany({
            where: {
                category
            },
            orderBy: {
                productionDate: 'desc'
            }
        })

        return arts
    }

    async getAllArts(): Promise<Art[]> {
        const arts = await this.artRepository.art.findMany({
            orderBy: {
                productionDate: 'desc'
            }
        })

        return arts
    }

    async updateArt({ id, title, category, description, dimension, productionDate, uniqueCode }: Art): Promise<void> {
        await this.artRepository.art.update({
            where: {
                id
            },
            data: {
                title,
                category,
                description,
                dimension,
                productionDate,
                uniqueCode
            }
        })
    }

    async updateArtImage({ id, image }: Art): Promise<void> {
        await this.artRepository.art.update({
            where: {
                id
            },
            data: {
                image
            }
        })
    }

    async deleteArt(id: string): Promise<void> {
        await this.artRepository.art.delete({
            where: {
                id
            }
        })
    }

}