import { useMutation, gql } from "@apollo/client"
import { Field, Form, Formik } from "formik"
import Modal from 'react-modal'
import { saveArtYupSchema } from "../../../schemas/Art"
import { Container } from "./style"

const CREATE_ART = gql`
    mutation(
        $file: Upload!,
        $uniqueCode: String!,
        $description: String!,
        $dimension: String!,
        $title: String!,
        $productionDate: DateTime!
        ) {
            saveArt(
                file: $file,
                uniqueCode: $uniqueCode, 
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

    const handleSubmitForm = (values) => {

        saveArt({
            variables: {
                file: values.file,
                uniqueCode: values.uniqueCode,
                description: values.description,
                dimension: values.dimension,
                title: values.title,
                productionDate: values.productionDate
            }
        })

        onRequestClose()
    }

    const initialValues = {
        file: '',
        uniqueCode: '',
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
                            <Field
                                type="text"
                                name='title'
                                placeholder="Title"
                            />
                            {errors.title && <div className="errorMessage">{errors.title}</div>}
                            <Field
                                type="text"
                                name='uniqueCode'
                                placeholder="UniqueCode"
                            />
                            {errors.uniqueCode && <div className="errorMessage">{errors.uniqueCode}</div>}
                            <textarea
                                name='description'
                                placeholder="Description"
                            />
                            {errors.description && <div className="errorMessage">{errors.description}</div>}
                            <Field
                                type="text"
                                name='dimension'
                                placeholder="Dimension"
                            />
                            {errors.dimension && <div className="errorMessage">{errors.dimension}</div>}
                            <Field
                                type="date"
                                name='productionDate'
                                placeholder="Production Date"
                            />
                            {errors.productionDate && <div className="errorMessage">{errors.productionDate}</div>}

                            <input
                                type="file"
                                onChange={(event) => {
                                    setFieldValue('file', event.target.files[0])
                                }}
                            />
                            {errors.file && <div className="errorMessage">{errors.file}</div>}

                            <button type="submit">Save</button>
                        </Form>
                    )}
                </Formik>
            </Container>

        </Modal >

    )
}
