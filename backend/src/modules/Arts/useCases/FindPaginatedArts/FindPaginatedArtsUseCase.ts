import { inject, injectable } from "tsyringe";
import { Art } from "../../models/Art";
import { IArtsRepository } from "../../repositories/IArtsRepository";

@injectable()
export class FindPaginatedArtsUseCase {

    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute(skip: number, take: number): Promise<Art[]> {
        const arts = await this.artsRepository.getPaginatedArts(skip, take)

        return arts
    }
}