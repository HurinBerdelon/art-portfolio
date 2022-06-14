import { Popover } from '@headlessui/react'
import { Formik, FormikValues, Form, Field } from "formik";
import * as yup from 'yup'
import { Container } from "./style";
import { useCategory } from '../../../hooks/useCategory';

export function NewCategory(): JSX.Element {

    const { createCategory } = useCategory()

    async function handleSubmit(values: FormikValues, close) {
        await createCategory(values.title)

        close()
    }

    const initialValues = {
        title: ''
    }

    const categorySchema = yup.object().shape({
        title: yup.string().required('Title is Required')
    })

    return (
        <Popover.Panel>
            {({ close }) => (
                <Container>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => handleSubmit(values, close)}
                        validationSchema={categorySchema}
                    >
                        {({ errors }) => (
                            <Form>
                                <h4>Create New Category</h4>
                                <div>
                                    <label htmlFor="title">🇬🇧</label>
                                    <Field
                                        id='title'
                                        type="text"
                                        name='title'
                                        placeholder={errors.title ? errors.title : "Title"}
                                        className={errors.title ? 'errorMessage' : ''}
                                    />
                                </div>

                                <button
                                    className='buttonSubmit'
                                    type='submit'
                                >
                                    Save
                                </button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            )}
        </Popover.Panel>
    )
}