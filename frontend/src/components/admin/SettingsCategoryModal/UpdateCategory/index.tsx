import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from 'yup'
import { useRouter } from "next/router";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useCategory } from "../../../../hooks/useCategory";
import { CategorySchema } from "../../../../schemas/Category";
import { Container } from "./style";
import { languages } from "../../../../config/languages";

interface UpdateCategoryProps {
    category: CategorySchema
    onRequestClose(): void
    setIsCardFlipped(isFlipped: boolean): void
}

export function UpdateCategory({ onRequestClose, category, setIsCardFlipped }: UpdateCategoryProps): JSX.Element {

    const { updateCategory, updateTranslation } = useCategory()
    const { locales } = useRouter()

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


    const initialValues: { [k: string]: string } = {}

    locales.map(locale => {
        if (locale === 'en') initialValues['en'] = category.title
        else {
            const translation = category.Translations.find(item => item.language === locale)
            initialValues[locale] = translation ? translation.title : ''
        }
    })

    const saveCategorySchema = yup.object().shape({
        en: yup.string().required('Title is required'),
    })

    return (
        <Container>
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
            <button
                className="delete"
                onClick={() => setIsCardFlipped(true)}
            >
                Delete Category
                <ArrowRightAltIcon />
            </button>
        </Container>
    )
}