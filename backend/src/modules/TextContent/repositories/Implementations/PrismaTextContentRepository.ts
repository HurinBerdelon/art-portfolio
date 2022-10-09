import { TextContent } from "@prisma/client";
import { prisma } from "../../../../services/prisma";
import { CreateTextContentDTO, ITextContentRepository } from "../ITextContentRepository";

export class PrismaTextContentRepository implements ITextContentRepository {

    private textContentRepository = prisma.textContent

    async create({
        idiom,
        imageUrl,
        page,
        text,
        type,
        imageFormat
    }: CreateTextContentDTO): Promise<TextContent> {

        const textContent = await this.textContentRepository.create({
            data: {
                idiom,
                imageUrl,
                page,
                text,
                type,
                imageFormat
            }
        })

        return textContent
    }

    async findById(id: string): Promise<TextContent> {
        const textContent = await this.textContentRepository.findUnique({
            where: {
                id
            }
        })

        return textContent
    }

    async findByPage(page: string): Promise<TextContent[]> {
        const textContents = await this.textContentRepository.findMany({
            where: {
                page
            }
        })

        return textContents
    }

    async findByType(type: string): Promise<TextContent[]> {
        const textContents = await this.textContentRepository.findMany({
            where: {
                type
            }
        })

        return textContents
    }

    async findAll(): Promise<TextContent[]> {
        const textContents = await this.textContentRepository.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        })
        return textContents
    }

    async updateText(id: string, text: string, imageFormat: string): Promise<TextContent> {

        const textContent = await this.textContentRepository.update({
            where: {
                id
            },
            data: {
                text,
                imageFormat
            }
        })
        return textContent
    }

    async updateImage(id: string, imageUrl: string): Promise<TextContent> {

        const textContent = await this.textContentRepository.update({
            where: {
                id
            },
            data: {
                imageUrl
            }
        })
        return textContent
    }

    async delete(id: string): Promise<void> {
        await this.textContentRepository.delete({
            where: {
                id
            }
        })
    }


}