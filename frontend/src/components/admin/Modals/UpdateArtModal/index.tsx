import { useMutation, gql } from "@apollo/client"
import { Form, Formik, FormikValues } from 'formik'
import Modal from 'react-modal'
import { ArtSchema, updateArtYupSchema, } from "../../../../schemas/Art"
import { Container } from "./style"
import { InputZone } from "../InputZone"
import { DropImage } from "../DropImage"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

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
                productionDate: $productionDate)
        }`

const UPDATE_ART_IMAGE = gql`
    mutation(
        $id: String!,
        $file: Upload!
        ) {
            updateArtImage(
                id: $id,
                file: $file)
        }`

interface UpdateArttModalProps {
    isOpen: boolean
    onRequestClose(): void
    art: ArtSchema
}

export function UpdateArtModal({ isOpen, onRequestClose, art }: UpdateArttModalProps): JSX.Element {

    const [updateArt] = useMutation(UPDATE_ART)
    const [updateArtImage] = useMutation(UPDATE_ART_IMAGE)
    const [gqlError, setGqlError] = useState('')
    const [preview, setPreview] = useState<string>()

    useEffect(() => {
        setPreview(art.image)
        setGqlError('')
    }, [art, onRequestClose])

    const handleSubmitForm = (values: FormikValues) => {

        if (values.file) {
            updateArtImage({
                variables: {
                    id: art.id,
                    file: values.file
                }
            })
        }

        updateArt({
            variables: {
                id: art.id,
                category: values.category,
                uniqueCode: values.uniqueCode,
                description: values.description,
                dimension: values.dimension,
                title: values.title,
                productionDate: values.productionDate
            }
        }).then(() => onRequestClose())
            .catch(() => setGqlError('Code Already in use'))
    }

    const initialValues = {
        file: '',
        category: art.category,
        uniqueCode: art.uniqueCode,
        description: art.description,
        dimension: art.dimension,
        title: art.title,
        productionDate: dayjs(art.productionDate).format('YYYY-MM-DD')
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className={'react-modal-content'}
        >

            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
            >
                <img src="/images/close.svg" alt="close-modal-button" />
            </button>

            <Container>
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
                                gqlError={gqlError}
                                errors={errors}
                                setFieldValue={setFieldValue}
                            />
                        </Form>
                    )}
                </Formik>
            </Container>


        </Modal>

    )
}