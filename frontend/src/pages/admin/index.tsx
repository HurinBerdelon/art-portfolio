import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from 'next-auth/react'
import { Container } from "./style";
import { apolloClient } from "../../services/apolloClient";
import { gql } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { Header } from "../../components/Header";
import { ListOfArts } from "../../components/admin/ListOfArts";
import { ArtProvider, useArts } from "../../hooks/useArts";
import { useCurrentTheme } from "../../hooks/useTheme";
import { AdminLinks } from "../../components/admin/AdminLinks";
import { NavBar } from "../../components/NavBar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DesktopHeader } from "../../components/Header/DesktopHeader";
import { useEffect } from "react";
import { ArtSchema } from "../../schemas/Art";

interface AdminProps {
    arts: ArtSchema[]
}

export default function Admin({ arts }: AdminProps): JSX.Element {

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
                        <DesktopHeader />
                        <NavBar />
                        <div className="contentContainer">
                            <AdminLinks />
                            <ListOfArts arts={arts} />
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

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {

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

    try {
        const { data } = await apolloClient.query({
            query: gql`
                query Arts {
                    arts {
                        id
                        title
                        categoryTitle
                        description
                        image
                        dimension
                        uniqueCode
                        productionDate
                    }
                }
            `
        })

        return {
            props: {
                arts: data.arts,
                session,
                ...(await serverSideTranslations(locale, ['admin', 'common'])),
            }
        }
    } catch (error) {

        return {
            props: {
                arts: [],
                session,
                error: error.message,
                ...(await serverSideTranslations(locale, ['admin', 'common'])),
            }
        }
    }
}