import { useMutation, gql } from "@apollo/client"
import { Form, Formik, FormikValues } from "formik"
import { useEffect, useState } from "react"
import Modal from 'react-modal'
import { saveArtYupSchema } from "../../../../schemas/Art"
import { Container } from "./style"
import { DropImage } from "../DropImage";
import { InputZone } from "../InputZone";
import { revalidateSSG } from "../../../../services/revalidate"

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
                productionDate: $productionDate)
        }`

interface CreateArtModalProps {
    isOpen: boolean
    onRequestClose(): void
}

export function CreateArtModal({ isOpen, onRequestClose }: CreateArtModalProps): JSX.Element {

    const [saveArt] = useMutation(CREATE_ART)
    const [gqlError, setGqlError] = useState('')
    const [preview, setPreview] = useState<string>()

    useEffect(() => {
        setPreview('')
        setGqlError('')
    }, [onRequestClose])


    const handleSubmitForm = (values: FormikValues) => {

        saveArt({
            variables: {
                file: values.file,
                uniqueCode: values.uniqueCode,
                category: values.category,
                description: values.description,
                dimension: values.dimension,
                title: values.title,
                productionDate: values.productionDate
            }
        }).then(() => {
            revalidateSSG({ path: values.category })
            revalidateSSG({ path: '' })
            onRequestClose()
        })
            .catch(() => setGqlError('Code Already in use'))
    }

    const initialValues = {
        file: '',
        uniqueCode: '',
        category: '',
        description: '',
        dimension: '',
        title: '',
        productionDate: ''
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
                <h2>Save New Art</h2>
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
                                gqlError={gqlError}
                                initialValues={initialValues}
                                setFieldValue={setFieldValue}
                            />
                        </Form>
                    )}
                </Formik>
            </Container>

        </Modal >

    )
}
