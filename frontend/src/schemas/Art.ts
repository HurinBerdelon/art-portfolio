import * as yup from 'yup'
import { availableImageTypes } from '../config/availableImageType'
import { validationErrorMessages } from './validationErrorMessages'

export interface ArtSchema {
    id: string
    title: string
    categoryTitle: string
    description?: string
    image: string
    dimension: string
    uniqueCode: string
    productionDate: Date
}

export function createArtSchemas(locale: string) {

    const saveArtYupSchema = yup.object().shape({
        title: yup.string().required(validationErrorMessages.title[locale]),
        description: yup.string(),
        categoryTitle: yup.string().required(validationErrorMessages.categoryTitle[locale]),
        file: yup.mixed().required(validationErrorMessages.file[locale]).test('fileFormat', validationErrorMessages.imageOnly[locale], value => {
            if (value) {
                return availableImageTypes.includes(value.type)
            } else {
                return false
            }
        }),
        dimension: yup.string().required(validationErrorMessages.dimension[locale]),
        uniqueCode: yup.string().required(validationErrorMessages.uniqueCode[locale]),
        productionDate: yup.date().required(validationErrorMessages.productionDate[locale]),
    })

    const updateArtYupSchema = yup.object().shape({
        title: yup.string().required(validationErrorMessages.title[locale]),
        description: yup.string(),
        categoryTitle: yup.string().required(validationErrorMessages.categoryTitle[locale]),
        dimension: yup.string().required(validationErrorMessages.title[locale]),
        uniqueCode: yup.string().required(validationErrorMessages.title[locale]),
        productionDate: yup.date().required(validationErrorMessages.title[locale]),
    })

    return {
        saveArtYupSchema,
        updateArtYupSchema
    }
}