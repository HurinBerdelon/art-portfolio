import { Dialog } from "@headlessui/react";
import { Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup'
import { availableImageTypes } from "../../../../config/availableImageType";
import { ModalContentOverlay } from "../../../../styles/global";
import { DropImage } from "../../ArtForms/DropImage";
import { RichTextEditor } from "../RichTextEditor";
import { Container } from "./style";

interface UpdateAboutProps {
    isOpen: boolean
    prevContent: string
    category: 'yourself' | 'business'
    idiom: string
    onRequestClose(): void
}

export function UpdateAbout({
    isOpen,
    prevContent,
    category,
    idiom,
    onRequestClose
}: UpdateAboutProps): JSX.Element {

    const [htmlContent, setHtmlContent] = useState('')
    const [preview, setPreview] = useState('')

    useEffect(() => {
        setPreview('')
    }, [onRequestClose])

    function createPreview() {
        // TODO
        // save htmlContent at database
        // revalidateSSG for aboutPage
    }

    function handleSubmitForm(values: FormikValues) {

        console.log(values)
    }

    const imageSchema = yup.object().shape({
        file: yup.mixed().required('Image is Required').test('fileFormat', 'Image Only', value => {
            if (value) {
                return availableImageTypes.includes(value.type)
            } else {
                return false
            }
        })
    })

    const initialValues = {
        file: ''
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

                    <h2>Create your <span>about {category}</span> section</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSubmitForm(values)}
                        validationSchema={imageSchema}
                    >
                        {({ errors, setFieldValue }) => (
                            <Form>
                                <DropImage
                                    errors={errors}
                                    preview={preview}
                                    setFieldValue={setFieldValue}
                                    setPreview={setPreview}
                                // createPreview={preview ? createPreview : null}
                                />
                                <RichTextEditor prevContent={prevContent} setHtmlContent={setHtmlContent} />
                                <button type='submit' className="buttonSubmit">
                                    Save
                                </button>
                            </Form>
                        )}
                    </Formik>

                </Container>
            </Dialog.Panel>
        </Dialog>
    )
}