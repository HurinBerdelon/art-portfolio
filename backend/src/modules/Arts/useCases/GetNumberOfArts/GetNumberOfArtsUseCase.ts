import { inject, injectable } from "tsyringe";
import { IArtsRepository } from "../../repositories/IArtsRepository";

@injectable()
export class GetNumberOfArtsUseCase {

    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute(categoryTitle: string): Promise<number> {
        const arts = await this.artsRepository.getNumberOfArts(categoryTitle)

        return arts
    }
}