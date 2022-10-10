import * as yup from 'yup'
import { Dialog } from "@headlessui/react"
import { Field, Form, Formik, FormikValues } from "formik"
import { useRouter } from "next/router"
import { ModalContentOverlay } from "../../../styles/global"
import { Container } from "./style"
import { languages } from '../../../config/languages'
import { useCategory } from '../../../hooks/useCategory'

interface CreateCategoryModalProps {
    isOpen: boolean
    onRequestClose(): void
}

export function CreateCategoryModal({ isOpen, onRequestClose }: CreateCategoryModalProps): JSX.Element {

    const { createCategory } = useCategory()

    const handleSubmitForm = (values: FormikValues) => {

        createCategory(values.title)

        onRequestClose()

    }

    const { locales } = useRouter()

    const initialValues: { [k: string]: string } = {}

    locales.map(locale => {
        if (locale === 'en') initialValues['title'] = ''
        else initialValues[locale] = ''
    })

    const saveCategorySchema = yup.object().shape({
        title: yup.string().required('Title is required'),
    })

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

                    <h2>Create new Category</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSubmitForm(values)}
                        validationSchema={saveCategorySchema}
                    >
                        {({ errors }) => (

                            <Form>
                                <div className="inputContainer">
                                    <span>{languages.en.flag}</span>
                                    <Field
                                        type="text"
                                        name='title'
                                        placeholder={errors.title ? errors.title : "Title"}
                                        className={errors.title ? 'errorMessage' : ''}
                                    />
                                </div>

                                <button className='buttonSubmit' type="submit">Save</button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Dialog.Panel>

        </Dialog>
    )
}