import { gql, useMutation } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { Form, Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from 'yup'
import { availableImageTypes } from "../../../../config/availableImageType";
import { useTextContent } from "../../../../hooks/useTextContent";
import { validationErrorMessages } from "../../../../schemas/validationErrorMessages";
import { toastError, toastSuccess, toastWarn } from "../../../../services/toastProvider";
import { ModalContentOverlay } from "../../../../styles/global";
import { DropImage } from "../../ArtForms/DropImage";
import { AboutTips } from "../AboutTips";
import { ImageFormat } from "../ImageFormat";
import { RichTextEditor } from "../RichTextEditor";
import SyncIcon from '@mui/icons-material/Sync';
import { Container } from "./style";

const CREATE_TEXT_CONTENT = gql`
    mutation(
        $file: Upload!,
        $text: String!,
        $page: String!
        $type: String!,
        $idiom: String!,
        $imageFormat: String!
        ) {
            createTextContent(
                file: $file,
                text: $text, 
                page: $page
                type: $type, 
                idiom: $idiom,
                imageFormat: $imageFormat
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
    const { t } = useTranslation()
    const { locale } = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setPreview('')
    }, [onRequestClose])

    function createText(values: FormikValues) {
        setIsLoading(true)
        createTextContent({
            variables: {
                file: values.file,
                text: htmlContent,
                type: category,
                page: 'about',
                imageFormat: values.imageFormat,
                idiom
            }
        }).then(response => {
            setTextContents([...textContents, response.data.createTextContent])
            toastSuccess(t('admin:textSaved'))
            onRequestClose()
        }).catch((error) => {
            toastError(t('admin:unhandledError'))
            console.log(error.message)
        })
    }

    function handleSubmitForm(values: FormikValues) {
        createText(values)
        setIsLoading(false)
    }

    const imageSchema = yup.object().shape({
        file: yup.mixed().required(validationErrorMessages.file[locale]).test('fileFormat', validationErrorMessages.imageOnly[locale], value => {
            if (value) {
                return availableImageTypes.includes(value.type)
            } else {
                return false
            }
        })
    })

    const initialValues = {
        file: '',
        imageFormat: 'square'
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
                        {t('admin:createYour')} <span> {t(`admin:${category}`)}</span> {t('admin:section')}
                        <AboutTips category={category} />
                    </h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSubmitForm(values)}
                        validationSchema={imageSchema}
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
                                        createPreview={null}
                                    />
                                    <ImageFormat setFieldValue={setFieldValue} />
                                </div>
                                <div className="formContainer">
                                    <RichTextEditor setHtmlContent={setHtmlContent} />
                                    <button
                                        type='submit'
                                        className="buttonSubmit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <SyncIcon className="loading" /> : t('admin:save')}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Container>
            </Dialog.Panel>
        </Dialog >
    )
}