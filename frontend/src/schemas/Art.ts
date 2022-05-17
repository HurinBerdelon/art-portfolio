import * as yup from 'yup'
export interface ArtSchema {
    id: string
    title: string
    description?: string
    image: string
    dimension: string
    uniqueCode: string
    productionDate: Date
}

export const saveArtYupSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    file: yup.mixed().test('fileFormat', 'Image Only', value => {
        if (value) {
            return ["image/png", "image/jpg", "image/jpeg", "image/svg"].includes(value.type)
        } else {
            return false
        }
    }).required('Image is Required'),
    dimension: yup.string().required('Dimension is required'),
    uniqueCode: yup.string().required('Unique Code is Required'),
    productionDate: yup.date().required('Production Date is Required'),
})

export const updateArtYupSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    dimension: yup.string().required('Dimension is required'),
    uniqueCode: yup.string().required('Unique Code is Required'),
    productionDate: yup.date().required('Production Date is Required'),
})