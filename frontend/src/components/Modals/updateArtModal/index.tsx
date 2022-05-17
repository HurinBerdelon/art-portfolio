import { useMutation, gql } from "@apollo/client"
import { Field, Form, Formik } from 'formik'
import Modal from 'react-modal'
import { ArtSchema, updateArtYupSchema } from "../../../schemas/Art"
import { Container } from "./style"
import dayjs from "dayjs"

const UPDATE_ART = gql`
    mutation(
        $id: String!,
        $uniqueCode: String!,
        $description: String!,
        $dimension: String!,
        $title: String!,
        $productionDate: DateTime!
        ) {
            updateArt(
                id: $id,
                uniqueCode: $uniqueCode, 
                description: $description, 
                dimension: $dimension, 
                title: $title,
                productionDate: $productionDate)
        }`

interface UpdateArttModalProps {
    isOpen: boolean
    onRequestClose(): void
    art: ArtSchema
}

export function UpdateArtModal({ isOpen, onRequestClose, art }: UpdateArttModalProps): JSX.Element {

    const [updateArt] = useMutation(UPDATE_ART)

    const handleSubmitForm = (values) => {

        console.log(values.uniqueCode)
        updateArt({
            variables: {
                id: art.id,
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
        title: art.title,
        uniqueCode: art.uniqueCode,
        description: art.description,
        dimension: art.dimension,
        productionDate: dayjs(art.productionDate).format('YYYY-MM-DD'),
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
                <h1>Update File</h1>
                <div>
                    <img src={art.image} alt={art.title} />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSubmitForm(values)}
                        validationSchema={updateArtYupSchema}
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
                                <Field
                                    as='textarea'
                                    name='description'
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

                                <button type="submit">Save</button>
                            </Form>
                        )}
                    </Formik>
                </div>

            </Container>


        </Modal>

    )
}