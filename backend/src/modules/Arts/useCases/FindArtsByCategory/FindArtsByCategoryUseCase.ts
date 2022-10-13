import { inject, injectable } from "tsyringe";
import { Art } from "../../models/Art";
import { IArtsRepository } from "../../repositories/IArtsRepository";

@injectable()
export class FindArtsByCategory {

    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute(categoryTitle: string, skip: number, take: number): Promise<Art[]> {
        const arts = await this.artsRepository.getArtsByCategory(categoryTitle, skip, take)

        return arts
    }
}