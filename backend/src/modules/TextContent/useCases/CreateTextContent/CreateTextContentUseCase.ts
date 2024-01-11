import { TextContent } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/providers/storageProvider/IStorageProvider";
import { CreateTextContentDTO, ITextContentRepository } from "../../repositories/ITextContentRepository";

@injectable()
export class CreateTextContentUseCase {

    constructor(
        @inject('TextContentsRepository')
        private textContentRepository: ITextContentRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    async execute({ idiom, imageUrl: image, page, text, type, imageFormat }: CreateTextContentDTO): Promise<TextContent> {

        const imageUrl = await this.storageProvider.save('pictures', image)

        const textContent = await this.textContentRepository.create({
            idiom,
            imageUrl,
            page,
            text,
            type,
            imageFormat
        })
        return textContent
    }
}