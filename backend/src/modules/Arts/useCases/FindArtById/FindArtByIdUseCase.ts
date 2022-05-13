import { inject, injectable } from "tsyringe";
import { Art } from "../../models/Art";
import { IArtsRepository } from "../../repositories/IArtsRepository";

@injectable()
export class FindArtByIdUseCase {

    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute(id: string): Promise<Art> {
        const art = await this.artsRepository.getArtById(id)

        if (!art) {
            throw new Error('Art not Found!')
        }

        return art
    }
}