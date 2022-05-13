import { Art } from "../models/Art";

export interface IArtsRepository {
    saveArt({ title, description, image, uniqueCode, dimension, productionDate }: Art): Promise<void>

    getArtById(id: string): Promise<Art>
    getArtByUniqueCode(uniqueCode: string): Promise<Art>
    getAllArts(): Promise<Art[]>

    updateArt({ id, title, description, image, dimension, productionDate }: Art): Promise<void>
    deleteArt(id: string): Promise<void>
}