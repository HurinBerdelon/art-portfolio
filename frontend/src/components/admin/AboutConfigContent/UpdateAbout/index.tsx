import { gql, useMutation } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup'
import { availableImageTypes } from "../../../../config/availableImageType";
import { useTextContent } from "../../../../hooks/useTextContent";
import { TextContentSchema } from "../../../../schemas/TextContent";
import { revalidateSSG } from "../../../../services/revalidate";
import { toastSuccess, toastWarn } from "../../../../services/toastProvider";
import { ModalContentOverlay } from "../../../../styles/global";
import { DropImage } from "../../ArtForms/DropImage";
import { AboutTips } from "../AboutTips";
import { RichTextEditor } from "../RichTextEditor";
import { Container } from "./style";

const UPDATE_TEXT_CONTENT = gql`
    mutation(
        $id: String!,
        $text: String!,
        ) {
            updateTextContent(
                id: $id
                text: $text, 
            ){
                id
                page
                type
                text
                idiom,
                imageUrl
                updatedAt
            }
    }`

const UPDATE_TEXT_CONTENT_IMAGE = gql`
    mutation(
        $id: String!,
        $file: Upload!,
        ) {
            updateTextContentImage(
                id: $id
                file: $file, 
            ){
                id
                page
                type
                text
                idiom,
                imageUrl
                updatedAt
            }
    }`

interface UpdateAboutProps {
    isOpen: boolean
    textContentOnUpdate: TextContentSchema
    onRequestClose(): void
}

export function UpdateAbout({
    isOpen,
    textContentOnUpdate,
    onRequestClose
}: UpdateAboutProps): JSX.Element {

    const [htmlContent, setHtmlContent] = useState('')
    const [preview, setPreview] = useState('')
    const [updateTextContent] = useMutation(UPDATE_TEXT_CONTENT)
    const [updateTextContentImage] = useMutation(UPDATE_TEXT_CONTENT_IMAGE)
    const { setTextContents, textContents } = useTextContent()

    function createPreview() {
        setPreview(textContentOnUpdate.imageUrl)
    }

    useEffect(() => {
        if (textContentOnUpdate) createPreview()
    }, [textContentOnUpdate, onRequestClose])

    if (!textContentOnUpdate) {
        return null
    }

    function updateText(values: FormikValues) {
        updateTextContent({
            variables: {
                id: textContentOnUpdate.id,
                text: htmlContent
            }
        }).then(response => {
            const index = textContents.findIndex(item => item.id === textContentOnUpdate.id)
            const tempTextContents = [...textContents]

            tempTextContents.splice(index, 1, response.data.updateTextContent)

            setTextContents(tempTextContents)
            toastSuccess(`Text was updated!`)
        }).catch(error => toastWarn(`Unhandled error with message: ${error.message}! Please, contact the developer`))


        updateTextContentImage({
            variables: {
                id: textContentOnUpdate.id,
                file: values.file
            }
        }).then(response => {
            const index = textContents.findIndex(item => item.id === textContentOnUpdate.id)
            const tempTextContents = [...textContents]

            tempTextContents.splice(index, 1, response.data.updateTextContentImage)

            setTextContents(tempTextContents)
            toastSuccess(`Image was updated!`)
            revalidateSSG({ path: 'about' })
            onRequestClose()
        }).catch(error => toastWarn(`Unhandled error with message: ${error.message}! Please, contact the developer`))
    }

    function handleSubmitForm(values: FormikValues) {

        console.log('updating', values, htmlContent)
        updateText(values)
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
                        Update your <span> {textContentOnUpdate.type}</span> section
                        <AboutTips category={textContentOnUpdate.type} />
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
                                    createPreview={createPreview}
                                />
                                <RichTextEditor prevContent={textContentOnUpdate.text} setHtmlContent={setHtmlContent} />
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