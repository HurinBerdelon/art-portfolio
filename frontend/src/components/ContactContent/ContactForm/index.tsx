import { Field, Form, Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import * as yup from 'yup'
import { Container } from "./style";

export function ContactForm(): JSX.Element {

    const { t } = useTranslation()

    const contactSchema = yup.object().shape({
        name: yup.string().required('Name is Required'),
        email: yup.string().email('Invalid e-mail format').required('Email is Required'),
        message: yup.string().required('Message is Required'),
    })

    const initialValues = {
        name: '',
        email: '',
        message: '',
    }

    // TODO: send email
    function handleSubmit(values: FormikValues) {
        console.log(values)
    }

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={contactSchema}
            >
                {({ errors }) => (
                    <Form>
                        <label htmlFor="name">{t('common:name')}:</label>
                        <Field
                            id='name'
                            type='text'
                            name='name'
                            placeholder={errors.name ? errors.name : "Name"}
                            className={errors.name ? 'errorMessage' : ''}
                        />
                        <label htmlFor="email">E-mail:</label>
                        <Field
                            id='email'
                            type='email'
                            name='email'
                            placeholder={errors.email ? errors.email : "E-mail"}
                            className={errors.email ? 'errorMessage' : ''}
                        />
                        <label htmlFor="message">{t('common:message')}:</label>
                        <Field
                            id='message'
                            as='textarea'
                            name='message'
                            placeholder={errors.message ? errors.message : "Message..."}
                            className={errors.message ? 'errorMessage' : ''}
                        />
                        <button className="buttonSubmit" type="submit">{t('common:send')}</button>
                    </Form>
                )}

            </Formik>
        </Container>
    )
}