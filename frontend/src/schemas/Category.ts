import { Router } from 'next/router'
import * as yup from 'yup'
interface TranslationSchema {
    id: string
    title: string
    language: string
}

export interface CategorySchema {
    id: string
    title: string
    Translations: TranslationSchema[]
}