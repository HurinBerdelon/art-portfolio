import { useMutation, gql } from "@apollo/client"
import { Dialog } from "@headlessui/react"
import { Form, Formik, FormikValues } from "formik"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useArts } from "../../../hooks/useArts"
import { ArtSchema, createArtSchemas } from "../../../schemas/Art"
import { toastError, toastSuccess } from "../../../services/toastProvider"
import { ModalContentOverlay } from "../../../styles/global"
import { DropImage } from "../ArtForms/DropImage"
import { InputZone } from "../ArtForms/InputZone"
import { Container } from "./style"

const CREATE_ART = gql`
    mutation(
        $file: Upload!,
        $uniqueCode: String!,
        $category: String!
        $description: String!,
        $dimension: String!,
        $title: String!,
        $productionDate: DateTime!
        ) {
            saveArt(
                file: $file,
                uniqueCode: $uniqueCode, 
                category: $category
                description: $description, 
                dimension: $dimension, 
                title: $title,
                productionDate: $productionDate){
                    id,
                    title,
                    uniqueCode,
                    categoryTitle,
                    description,
                    dimension,
                    image,
                    productionDate,
                }
        }`

interface CreateArtModalProps {
    isOpen: boolean
    onRequestClose(): void
}

export function CreateArtModal({ isOpen, onRequestClose }: CreateArtModalProps): JSX.Element {

    const [saveArt] = useMutation(CREATE_ART)
    const { setArts, arts } = useArts()
    const [preview, setPreview] = useState<string>()
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)

    const { locale } = useRouter()

    const { saveArtYupSchema } = createArtSchemas(locale)

    useEffect(() => {
        setPreview('')
    }, [onRequestClose])

    const handleSubmitForm = (values: FormikValues) => {

        setIsLoading(true)
        function sortArtsByDate(newArt: ArtSchema) {
            const tempArts = [...arts]
            tempArts.push(newArt)
            tempArts.sort((a, b) => {
                if (a.productionDate < b.productionDate) return 1
                else if (a.productionDate > b.productionDate) return -1
                return 0
            })
            setArts(tempArts)
        }

        saveArt({
            variables: {
                file: values.file,
                uniqueCode: values.uniqueCode,
                category: values.categoryTitle,
                description: values.description,
                dimension: values.dimension,
                title: values.title,
                productionDate: values.productionDate
            }
        }).then((response) => {
            sortArtsByDate(response.data.saveArt)
            toastSuccess(`${values.title} has been saved`)
            onRequestClose()
        }).catch((error) => {
            if (error.message === `Art with code ${values.uniqueCode} already exists!`) {
                toastError(`Art with code ${values.uniqueCode} already exists!`)
            } else {
                toastError(t('admin:unhandledError'))
                console.log(error.message)
            }
        }).finally(() => setIsLoading(false))
    }

    const initialValues = {
        file: '',
        uniqueCode: '',
        categoryTitle: '',
        description: '',
        dimension: '',
        title: '',
        productionDate: ''
    }

    return (
        <Dialog open={isOpen} onClose={onRequestClose}>
            <ModalContentOverlay aria-hidden={true} />
            <Dialog.Panel>
                <Container>
                    <button
                        type='button'
                        onClick={onRequestClose}
                        className='react-modal-close'
                    >
                        <img src="/images/close.svg" alt="close-modal-button" />
                    </button>

                    <h2>{t('admin:saveNewArt')}</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSubmitForm(values)}
                        validationSchema={saveArtYupSchema}
                    >
                        {({ errors, setFieldValue }) => (

                            <Form>
                                <DropImage
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                    preview={preview}
                                    setPreview={setPreview}
                                />
                                <InputZone
                                    errors={errors}
                                    initialValues={initialValues}
                                    setFieldValue={setFieldValue}
                                    isLoading={isLoading}
                                />
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Dialog.Panel>

        </Dialog>
    )
}