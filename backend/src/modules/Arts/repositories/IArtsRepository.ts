import { Art } from "@prisma/client"

export type createArtDTO = Omit<Art, 'id' | 'updatedAt' | 'createdAt'>
export type updateArtDTO = Omit<Art, 'updatedAt' | 'createdAt' | 'image'>

export interface IArtsRepository {
    saveArt({ title, description, categoryTitle, image, uniqueCode, dimension, productionDate }: createArtDTO): Promise<Art>

    getArtById(id: string): Promise<Art>
    getArtByUniqueCode(uniqueCode: string): Promise<Art>

    getArtsByCategory(category: string): Promise<Art[]>
    getAllArts(): Promise<Art[]>

    updateArt({ id, title, categoryTitle, description, dimension, productionDate, uniqueCode }: updateArtDTO): Promise<Art>
    updateArtImage(id: string, image: string): Promise<Art>
    deleteArt(id: string): Promise<void>
}