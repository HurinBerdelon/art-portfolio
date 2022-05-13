import { inject, injectable } from "tsyringe";
import { Art } from "../../models/Art";
import { IArtsRepository } from "../../repositories/IArtsRepository";

@injectable()
export class FindAllArtsUseCase {

    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute(): Promise<Art[]> {
        const arts = await this.artsRepository.getAllArts()

        return arts
    }
}