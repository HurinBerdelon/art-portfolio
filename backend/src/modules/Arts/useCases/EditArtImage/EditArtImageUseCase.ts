import { inject, injectable } from 'tsyringe';
import { Art } from '../../models/Art';
import { IArtsRepository } from '../../repositories/IArtsRepository';

@injectable()
export class EditArtImageUseCase {
    constructor(
        @inject('ArtsRepository')
        private artsRepository: IArtsRepository
    ) { }

    async execute({ id, image }: Art): Promise<void> {

        const art = await this.artsRepository.getArtById(id)

        if (!art) {
            throw new Error('Art not Found!')
        }

        await this.artsRepository.updateArtImage({
            id,
            image
        })
    }
}