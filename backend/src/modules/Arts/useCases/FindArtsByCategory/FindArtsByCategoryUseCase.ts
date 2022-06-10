import { inject, injectable } from "tsyringe";
import { Art } from "../../models/Art";
import { ArtCategory } from "../../models/ArtCategory";
import { IArtsRepository } from "../../repositories/IArtsRepository";

@injectable()
export class FindArtsByCategory {

    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute(category: string): Promise<Art[]> {
        const arts = await this.artsRepository.getArtsByCategory(ArtCategory[category])

        return arts
    }
}