import { gql, useMutation } from "@apollo/client";
import { Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { availableImageTypes } from "../../../../../config/availableImageType";
import { useTextContent } from "../../../../../hooks/useTextContent";
import { TextContentSchema } from "../../../../../schemas/TextContent";
import { toastError, toastSuccess, toastWarn } from "../../../../../services/toastProvider";
import { DropImage } from "../../../ArtForms/DropImage";
import { AboutTips } from "../../AboutTips";
import { ImageFormat } from "../../ImageFormat";
import { RichTextEditor } from "../../RichTextEditor";
import { Container } from "./style";
import { useTranslation } from "next-i18next";

const UPDATE_TEXT_CONTENT = gql`
    mutation(
        $id: String!,
        $text: String!,
        $imageFormat: String!
        ) {
            updateTextContent(
                id: $id
                text: $text, 
                imageFormat: $imageFormat
            ){
                id
                page
                type
                text
                idiom,
                imageUrl
                updatedAt
                imageFormat
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
                imageFormat
            }
    }`

interface UpdateAboutProps {
    textContentOnUpdate: TextContentSchema
    onRequestClose(): void
    setIsCardFlipped(isCardFlipped: boolean): void
}

export function UpdateAbout({
    textContentOnUpdate,
    onRequestClose,
    setIsCardFlipped
}: UpdateAboutProps): JSX.Element {

    const [htmlContent, setHtmlContent] = useState('')
    const [preview, setPreview] = useState('')
    const [updateTextContent] = useMutation(UPDATE_TEXT_CONTENT)
    const [updateTextContentImage] = useMutation(UPDATE_TEXT_CONTENT_IMAGE)
    const { setTextContents, textContents } = useTextContent()
    const { t } = useTranslation()

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

        if (values.file) {
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
                toastSuccess(t('admin:imageUpdated'))
            }).catch(error => {
                toastError(t('admin:unhandledError'))
                console.log(error.message)
            })
        }

        updateTextContent({
            variables: {
                id: textContentOnUpdate.id,
                text: htmlContent,
                imageFormat: values.imageFormat
            }
        }).then(response => {

            const index = textContents.findIndex(item => item.id === textContentOnUpdate.id)
            const tempTextContents = [...textContents]

            tempTextContents.splice(index, 1, response.data.updateTextContent)

            setTextContents(tempTextContents)
            toastSuccess(t('admin:textUpdated'))
            onRequestClose()
        }).catch(error => {
            toastError(t('admin:unhandledError'))
            console.log(error.message)
        })
    }

    function handleSubmitForm(values: FormikValues) {

        updateText(values)
    }

    const imageSchema = yup.object().shape({
        file: yup.mixed().test('fileFormat', 'Image Only', value => {
            if (value) {
                return availableImageTypes.includes(value.type)
            } else {
                return false
            }
        })
    })

    const initialValues = {
        file: '',
        imageFormat: textContentOnUpdate.imageFormat
    }

    return (

        <Container>
            <h2>
                {t('admin:updateYour')} <span> {t(`admin:${textContentOnUpdate.type}`)}</span> {t('admin:section')}
                <AboutTips category={textContentOnUpdate.type} />
            </h2>
            <Formik
                initialValues={initialValues}
                onSubmit={values => handleSubmitForm(values)}
                validationSchema={preview ? null : imageSchema}
            >
                {({ errors, setFieldValue, values }) => (
                    <Form>
                        <div className="formContainer">
                            <DropImage
                                errors={errors}
                                preview={preview}
                                setFieldValue={setFieldValue}
                                setPreview={setPreview}
                                previewClassName={values.imageFormat}
                                createPreview={() => {
                                    setFieldValue('file', '')
                                    createPreview()
                                }}
                            />
                            <ImageFormat setFieldValue={setFieldValue} />
                        </div>
                        <div className="formContainer2">
                            <RichTextEditor prevContent={textContentOnUpdate.text} setHtmlContent={setHtmlContent} />
                            <button type='submit' className="buttonSubmit">
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <button
                className="delete"
                onClick={() => setIsCardFlipped(true)}
            >
                {t('admin:deleteAbout')}
                <ArrowRightAltIcon />
            </button>
        </Container >
    )
}