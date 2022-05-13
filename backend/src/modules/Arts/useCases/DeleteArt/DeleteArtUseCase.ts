import { inject, injectable } from 'tsyringe';
import { IArtsRepository } from '../../repositories/IArtsRepository';

@injectable()
export class DeleteArtUseCase {
    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute(id: string): Promise<void> {

        const art = this.artsRepository.getArtById(id)

        if (!art) {
            throw new Error('Art not Found!')
        }

        await this.artsRepository.deleteArt(id)
    }
}