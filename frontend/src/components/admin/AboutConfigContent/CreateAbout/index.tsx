import { gql, useMutation } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup'
import { availableImageTypes } from "../../../../config/availableImageType";
import { useTextContent } from "../../../../hooks/useTextContent";
import { revalidateSSG } from "../../../../services/revalidate";
import { toastSuccess, toastWarn } from "../../../../services/toastProvider";
import { ModalContentOverlay } from "../../../../styles/global";
import { DropImage } from "../../ArtForms/DropImage";
import { AboutTips } from "../AboutTips";
import { RichTextEditor } from "../RichTextEditor";
import { Container } from "./style";

const CREATE_TEXT_CONTENT = gql`
    mutation(
        $file: Upload!,
        $text: String!,
        $page: String!
        $type: String!,
        $idiom: String!,
        ) {
            createTextContent(
                file: $file,
                text: $text, 
                page: $page
                type: $type, 
                idiom: $idiom, 
            ){
                id
                page
                type
                text
                idiom
                imageUrl
                updatedAt
            }
    }`

interface CreateAboutProps {
    isOpen: boolean
    category: 'aboutYourself' | 'aboutBusiness'
    idiom: string
    onRequestClose(): void
}

export function CreateAbout({
    isOpen,
    category,
    idiom,
    onRequestClose
}: CreateAboutProps): JSX.Element {

    const [htmlContent, setHtmlContent] = useState('')
    const [preview, setPreview] = useState('')
    const [createTextContent] = useMutation(CREATE_TEXT_CONTENT)
    const { setTextContents, textContents } = useTextContent()

    useEffect(() => {
        setPreview('')
    }, [onRequestClose])

    function createPreview() {
    }

    function createText(values: FormikValues) {
        createTextContent({
            variables: {
                file: values.file,
                text: htmlContent,
                type: category,
                page: 'about',
                idiom
            }
        }).then(response => {
            setTextContents([...textContents, response.data.createTextContent])
            toastSuccess('Text Saved!')
            revalidateSSG({ path: 'about' })
            onRequestClose()
        }).catch((error) => toastWarn(`Unhandled error with message: ${error.message}! Please, contact the developer`))
    }

    function handleSubmitForm(values: FormikValues) {

        createText(values)
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

                    <h2>
                        Create your <span> {category}</span> section
                        <AboutTips category={category} />
                    </h2>
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
                                    createPreview={preview ? createPreview : null}
                                />
                                <RichTextEditor setHtmlContent={setHtmlContent} />
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