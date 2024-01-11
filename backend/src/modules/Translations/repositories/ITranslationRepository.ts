import { Translations } from "@prisma/client"

export interface ITranslationRepository {
    create(title: string, language: string, categoryTitle: string): Promise<Translations>
    findById(id: string): Promise<Translations>
    findByCategory(categoryTitle: string): Promise<Translations[]>
    updateTitle(id: string, title: string): Promise<Translations>
}