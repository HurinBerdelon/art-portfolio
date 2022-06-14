interface TranslationSchema {
    id: string
    title: string
    language: string
}

export interface CategorySchema {
    id: string
    title: string
    createdAt: Date
    Translations: TranslationSchema[]
}