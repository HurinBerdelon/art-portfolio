import { Art } from "../models/Art";

export interface IArtsRepository {
    saveArt({ title, description, category, image, uniqueCode, dimension, productionDate }: Art): Promise<void>

    getArtById(id: string): Promise<Art>
    getArtByUniqueCode(uniqueCode: string): Promise<Art>

    getArtsByCategory(category: string): Promise<Art[]>
    getAllArts(): Promise<Art[]>

    updateArt({ id, title, category, description, dimension, productionDate, uniqueCode }: Art): Promise<void>
    updateArtImage({ id, image }: Art): Promise<void>
    deleteArt(id: string): Promise<void>
}