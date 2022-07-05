import * as yup from 'yup'
import { Dialog } from "@headlessui/react"
import { Field, Form, Formik, FormikValues } from "formik"
import { useRouter } from "next/router"
import { ModalContentOverlay } from "../../../styles/global"
import { Container } from "./style"
import { CategorySchema } from '../../../schemas/Category'
import { languages } from '../../../config/languages'
import { useCategory } from '../../../hooks/useCategory'

interface UpdateCategoryModalProps {
    isOpen: boolean
    category: CategorySchema
    onRequestClose(): void
}

export function UpdateCategoryModal({ isOpen, onRequestClose, category }: UpdateCategoryModalProps): JSX.Element {

    if (!category) {
        return null
    }

    const { updateCategory, updateTranslation } = useCategory()

    const handleSubmitForm = (values: FormikValues) => {

        updateCategory(category.id, values.en)

        Object.keys(values).map(locale => {
            if (locale !== 'en' && values[locale]) {
                console.log(locale, category)

                updateTranslation({
                    id: category.Translations.find(translation => translation.language === locale)?.id,
                    title: values[locale],
                    categoryTitle: values['en'],
                    language: locale
                })
            }
        })

        onRequestClose()
    }

    const { locales } = useRouter()

    const initialValues: { [k: string]: string } = {}

    locales.map(locale => {
        if (locale === 'en') initialValues['en'] = category.title
        else {
            const translation = category.Translations.find(item => item.language === locale)
            initialValues[locale] = translation ? translation.title : ''
        }
    })

    // const saveCategoryShape = {}

    // locales.map(locale => {
    //     if (locale === 'en') saveCategoryShape['title'] = yup.string().required('Title is required')
    //     else saveCategoryShape[locale] = yup.string()
    // })

    const saveCategorySchema = yup.object().shape({
        en: yup.string().required('Title is required'),
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

                    <h2>Update Category</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => handleSubmitForm(values)}
                        validationSchema={saveCategorySchema}
                    >
                        {({ errors }) => (

                            <Form>
                                {locales.map(locale => {
                                    if (locale === 'en') {
                                        return (
                                            <div key={locale} className="inputContainer">
                                                <span>{languages[locale].flag}</span>
                                                <Field
                                                    type="text"
                                                    name={locale}
                                                    placeholder={errors[locale] ? errors[locale] : "Title"}
                                                    className={errors[locale] ? 'errorMessage' : ''}
                                                />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={locale} className="inputContainer">
                                                <span>{languages[locale].flag}</span>
                                                <Field
                                                    type="text"
                                                    name={locale}
                                                    placeholder={errors[locale] ? errors[locale] : `${locale} translation`}
                                                    className={errors[locale] ? 'errorMessage' : ''}
                                                />
                                            </div>
                                        )
                                    }
                                })}

                                <button className='buttonSubmit' type="submit">Save</button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Dialog.Panel>

        </Dialog>
    )
}