import { Translations } from "@prisma/client";
import { prisma } from "../../../../services/prisma";
import { ITranslationRepository } from "../ITranslationRepository";

export class PrismaTranslationRepository implements ITranslationRepository {

    private translationsRepository = prisma.translations

    async create(title: string, language: string, categoryTitle: string): Promise<Translations> {

        const formatedTitle = title.split(' ').join('_').toLowerCase()
        const formatedcategoryTitle = categoryTitle.split(' ').join('_').toLowerCase()

        const translation = await this.translationsRepository.create({
            data: {
                title: formatedTitle,
                language,
                categoryTitle: formatedcategoryTitle
            }
        })

        return translation
    }

    async findById(id: string): Promise<Translations> {
        const translation = await this.translationsRepository.findUnique({
            where: {
                id
            }
        })

        return translation
    }

    async findByCategory(categoryTitle: string): Promise<Translations[]> {
        const translation = await this.translationsRepository.findMany({
            where: {
                categoryTitle
            }
        })

        return translation
    }

    async updateTitle(id: string, title: string): Promise<Translations> {

        const formatedTitle = title.split(' ').join('_').toLowerCase()

        const translation = await this.translationsRepository.update({
            where: {
                id
            },
            data: {
                title: formatedTitle
            }
        })

        return translation
    }
}