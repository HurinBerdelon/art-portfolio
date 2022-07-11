import { TextContent } from "@prisma/client"

export interface CreateTextContentDTO {
    type: string
    text: string
    page: string
    idiom: string
    imageUrl?: string
}

export interface ITextContentRepository {
    create({
        idiom,
        imageUrl,
        page,
        text,
        type
    }: CreateTextContentDTO): Promise<TextContent>
    findById(id: string): Promise<TextContent>
    findByType(type: string): Promise<TextContent[]>
    findByPage(page: string): Promise<TextContent[]>
    findAll(): Promise<TextContent[]>
    updateText(id: string, text: string): Promise<TextContent>
    updateImage(id: string, imageUrl: string): Promise<TextContent>
    delete(id: string): Promise<void>
}