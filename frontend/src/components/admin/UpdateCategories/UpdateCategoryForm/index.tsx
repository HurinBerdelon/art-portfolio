import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from 'yup'
import CheckIcon from '@mui/icons-material/Check';
import { CategorySchema } from "../../../../schemas/Category";
import { Container } from "./style";
import { useCategory } from "../../../../hooks/useCategory";
import { useRouter } from "next/router";
import { languages } from "../../../../config/languages";

interface UpdateCategoryFormProps {
    category: CategorySchema
    close(): void
}

export function UpdateCategoryForm({ category, close }: UpdateCategoryFormProps): JSX.Element {

    const { updateCategory, updateTranslation } = useCategory()
    const router = useRouter()

    const schemaEntries = router.locales.map(locale => {
        if (locale === 'en') {
            return ([locale, yup.string().required('English Title is required')])
        } else {
            return ([`${locale}`, yup.string()])
        }
    })

    const categorySchema = yup.object().shape(Object.fromEntries(schemaEntries))

    const initialValues = Object.fromEntries(
        router.locales.map(locale => {
            if (locale === 'en') {
                return ([locale, category.title
                    .split('_')
                    .join(' ')
                    // string.capitalize() to each word => string-art => String Art
                    .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
                ])
            } else {
                return ([
                    locale,
                    category.Translations.find(translation => translation.language === locale)
                        ?.title
                        .split('_')
                        .join(' ')
                        // string.capitalize() to each word => string-art => String Art
                        .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) || ''
                ])
            }
        })
    )

    function handleSubmit(values: FormikValues, close) {

        updateCategory(category.id, values.en)

        Object.keys(values).map(locale => {
            if (locale !== 'en' && values[locale]) {

                updateTranslation({
                    id: category.Translations.find(translation => translation.language === locale)?.id,
                    title: values[locale],
                    categoryTitle: values['en'],
                    language: locale
                })
            }
        })

        close()
    }

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleSubmit(values, close)}
                validationSchema={categorySchema}
            >
                {({ errors }) => (
                    <Form>
                        <h4>Update Category</h4>

                        {router.locales.map(locale => {
                            if (locale === 'en') {
                                return (
                                    <div key={locale} className="inputField">
                                        <label htmlFor={locale}>{languages[locale].flag}</label>
                                        <Field
                                            id={locale}
                                            type="text"
                                            name={locale}
                                            placeholder={errors[locale] ? errors[locale] : "Title"}
                                            className={errors[locale] ? 'errorMessage' : ''}
                                        />
                                    </div>)
                            } else {
                                return (
                                    <div key={locale} className="inputField">
                                        <label htmlFor={locale}>{languages[locale].flag}</label>
                                        <Field
                                            id={locale}
                                            type="text"
                                            name={locale}
                                            placeholder={`Title (${locale})`}
                                        />
                                    </div>
                                )
                            }
                        })}
                        <button
                            className='buttonSubmit'
                            type='submit'
                        >
                            <CheckIcon />
                        </button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}