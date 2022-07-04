import { useMutation, gql } from "@apollo/client"
import { Form, Formik, FormikValues } from 'formik'
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { ArtSchema, updateArtYupSchema } from "../../../schemas/Art"
import { useArts } from "../../../hooks/useArts"
import { toastError, toastSuccess } from "../../../services/toastProvider"
import { revalidateSSG } from "../../../services/revalidate"
import { Dialog } from "@headlessui/react"
import { Container } from "./style"
import { DropImage } from "../Forms/DropImage"
import { InputZone } from "../Forms/InputZone"
import { ModalContentOverlay } from "../../../styles/global"

const UPDATE_ART = gql`
    mutation(
        $id: String!,
        $category: String!
        $uniqueCode: String!,
        $description: String!,
        $dimension: String!,
        $title: String!,
        $productionDate: DateTime!
        ) {
            updateArt(
                id: $id,
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

const UPDATE_ART_IMAGE = gql`
    mutation(
        $id: String!,
        $file: Upload!
        ) {
            updateArtImage(
                id: $id,
                file: $file) {
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

interface UpdateArttModalProps {
    isOpen: boolean
    onRequestClose(): void
    art: ArtSchema
}

export function UpdateArtModal({ isOpen, onRequestClose, art }: UpdateArttModalProps): JSX.Element {

    if (!art) {
        return null
    }

    const { arts, setArts } = useArts()
    const [updateArt] = useMutation(UPDATE_ART)
    const [updateArtImage] = useMutation(UPDATE_ART_IMAGE)
    const [preview, setPreview] = useState<string>()

    useEffect(() => {
        setPreview(art.image)
    }, [art, onRequestClose])

    const handleSubmitForm = (values: FormikValues) => {

        function sortArtsByDate(newArt: ArtSchema) {
            const tempArts = [...arts]
            const oldArt = arts.find(art => art.id === newArt.id)
            tempArts.splice(tempArts.indexOf(oldArt), 1, newArt)
            tempArts.sort((a, b) => {
                if (a.productionDate < b.productionDate) return 1
                else if (a.productionDate > b.productionDate) return -1
                return 0
            })
            setArts(tempArts)
        }

        if (values.file) {
            updateArtImage({
                variables: {
                    id: art.id,
                    file: values.file
                }
            }).then((response) => {
                sortArtsByDate(response.data.updateArtImage)
                toastSuccess(`${values.title}'s image has been updated`)
            }).catch((error) => console.log(error.message))

        }

        updateArt({
            variables: {
                id: art.id,
                category: values.categoryTitle,
                uniqueCode: values.uniqueCode,
                description: values.description,
                dimension: values.dimension,
                title: values.title,
                productionDate: values.productionDate
            }
        }).then((response) => {
            if (values.category !== art.categoryTitle) {
                revalidateSSG({ path: values.categoryTitle })
            }
            revalidateSSG({ path: art.categoryTitle })
            revalidateSSG({ path: '' })
            sortArtsByDate(response.data.updateArt)
            toastSuccess(`${values.title} has been updated`)
            onRequestClose()
        }).catch((error) => toastError(error.message))
    }

    const initialValues = {
        file: '',
        categoryTitle: art.categoryTitle,
        uniqueCode: art.uniqueCode,
        description: art.description,
        dimension: art.dimension,
        title: art.title,
        productionDate: dayjs(art.productionDate).format('YYYY-MM-DD')
    }

    return (
        <Dialog open={isOpen} onClose={onRequestClose} >
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
                    <h2>Update Art</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSubmitForm(values)}
                        validationSchema={updateArtYupSchema}
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
                                    initialValues={initialValues}
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                />
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Dialog.Panel>


        </Dialog>

    )
}