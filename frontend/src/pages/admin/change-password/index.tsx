import * as yup from 'yup'
import { Field, Form, Formik, FormikValues } from "formik";
import { getSession, useSession } from "next-auth/react";
import { Container } from "./style";
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { apolloClient } from '../../../services/apolloClient';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { useCurrentTheme } from '../../../hooks/useTheme';

const UPDATE_USER = gql`
    mutation UpdateUser(
        $password: String!, 
        $username: String!, 
        $updateUserId: String!
        ) {
            updateUser(
                password: $password,
                username: $username, 
                id: $updateUserId) 
        } 
`

export default function ChangePassword(): JSX.Element {

    const { currentTheme } = useCurrentTheme()
    const { data: session } = useSession()
    const router = useRouter()
    const [updateUser] = useMutation(UPDATE_USER)

    const initialValues = {
        username: session?.user.name || '',
        password: ''
    }

    async function handleSubmitForm(values: FormikValues) {
        updateUser({
            variables: {
                updateUserId: session.id,
                username: values.username,
                password: values.password
            }
        }).then(() => router.push('/admin'))
    }

    const userSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is Required').min(8, 'Password must have at least 8 characters')
    })

    return (
        <>
            <Head>
                <title>Change Password | FeCardozo Workshop</title>
            </Head>
            <ThemeProvider theme={currentTheme}>
                <Container>
                    <div className="box">
                        <h1>Please, Create a new Password</h1>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmitForm}
                            validationSchema={userSchema}
                        >
                            {({ errors }) => (
                                <Form>
                                    <Field
                                        type="text"
                                        name='username'
                                        placeholder={errors.username ? errors.username : "Username"}
                                        className={errors.username ? 'errorMessage' : ''}
                                    />
                                    <Field
                                        type="password"
                                        name='password'
                                        placeholder="Password"
                                    />
                                    {errors.password ? (
                                        <div className="errorMessageDiv">
                                            {String(errors.password)}
                                        </div>
                                    ) : ""}
                                    <button className='buttonSubmit' type="submit">Save</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Container>
            </ThemeProvider>
        </>
    )
}

interface UserProps {
    username: string
    password: string
    id: string
    isNewUser: string
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            }
        }
    }

    const { data } = await apolloClient.query({
        query: gql`
            query GetUser {
                getUser {
                    id
                    username
                    password
                    isNewUser
                }
            }
        `
    })

    const user: UserProps = data.getUser[0]

    if (!user.isNewUser) {
        return {
            redirect: {
                destination: '/admin',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}