import { Dialog } from "@headlessui/react";
import { Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup'
import { availableImageTypes } from "../../../../config/availableImageType";
import { ModalContentOverlay } from "../../../../styles/global";
import { DropImage } from "../../ArtForms/DropImage";
import { RichTextEditor } from "../RichTextEditor";
import { Container } from "./style";

interface UpdateAboutYourselfProps {
    isOpen: boolean
    prevAboutYourself: string
    onRequestClose(): void
}

export function UpdateAboutYourself({ isOpen, prevAboutYourself, onRequestClose }: UpdateAboutYourselfProps): JSX.Element {

    const [htmlContent, setHtmlContent] = useState('')
    const [preview, setPreview] = useState('')

    useEffect(() => {
        setPreview('')
    }, [onRequestClose])

    function createPreview() {

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

                    <h2>Create your <span>about yourself</span> section</h2>
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
                                <RichTextEditor prevContent={prevAboutYourself} setHtmlContent={setHtmlContent} />
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