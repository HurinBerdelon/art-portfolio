import { prisma } from "../../../../services/prisma";
import { Art } from "../../models/Art";
import { IArtsRepository } from "../IArtsRepository";

export class PrismaArtRepository implements IArtsRepository {

    private artRepository = prisma

    async saveArt({ title, description, image, uniqueCode, dimension, productionDate }: Art): Promise<void> {
        await this.artRepository.art.create({
            data: {
                title,
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

    async getAllArts(): Promise<Art[]> {
        const arts = await this.artRepository.art.findMany({
            orderBy: {
                productionDate: 'asc'
            }
        }
        )

        return arts
    }

    async updateArt({ id, title, description, image, dimension, productionDate }: Art): Promise<void> {
        await this.artRepository.art.update({
            where: {
                id
            },
            data: {
                title,
                image,
                description,
                dimension,
                productionDate
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