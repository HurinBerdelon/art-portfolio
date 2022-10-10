import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from 'next-auth/react'
import { Container } from "./style";
import { apolloClient } from "../../services/apolloClient";
import { gql } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { Header } from "../../components/Header";
import { ListOfArts } from "../../components/admin/ListOfArts";
import { ArtProvider } from "../../hooks/useArts";
import { useCurrentTheme } from "../../hooks/useTheme";
import { AdminLinks } from "../../components/admin/AdminLinks";
import { NavBar } from "../../components/NavBar";

export default function Admin(): JSX.Element {

    const { currentTheme } = useCurrentTheme()

    return (
        <>
            <Head>
                <title>Admin | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <ArtProvider>
                    <Container>
                        <Header />
                        <NavBar />
                        <div className="contentContainer">
                            <AdminLinks />
                            <ListOfArts />
                        </div>
                    </Container>
                </ArtProvider>
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

    if (user.isNewUser) {
        return {
            redirect: {
                destination: '/admin/change-password',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}