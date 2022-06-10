import * as yup from 'yup'
import { availableImageTypes } from '../config/availableImageType'

export interface ArtSchema {
    id: string
    title: string
    category: "painting" | "drawing" | "craftsmanship" | "string_art"
    description?: string
    image: string
    dimension: string
    uniqueCode: string
    productionDate: Date
}

export const saveArtYupSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    category: yup.string().required('Category is required'),
    file: yup.mixed().required('Image is Required').test('fileFormat', 'Image Only', value => {
        if (value) {
            return availableImageTypes.includes(value.type)
        } else {
            return false
        }
    }),
    dimension: yup.string().required('Dimension is required'),
    uniqueCode: yup.string().required('Unique Code is Required'),
    productionDate: yup.date().required('Production Date is Required'),
})

export const updateArtYupSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    category: yup.string().required('Category is required'),
    dimension: yup.string().required('Dimension is required'),
    uniqueCode: yup.string().required('Unique Code is Required'),
    productionDate: yup.date().required('Production Date is Required'),
})