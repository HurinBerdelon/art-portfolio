import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { Gallery } from "../components/Gallery";
import { Header } from "../components/Header";
import { DesktopHeader } from "../components/Header/DesktopHeader";
import { NavBar } from "../components/NavBar";
import { useCurrentTheme } from "../hooks/useTheme";
import { ArtSchema } from "../schemas/Art";
import { apolloClient } from "../services/apolloClient"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface HomeProps {
    arts: ArtSchema[]
}

export default function Home({ arts }: HomeProps): JSX.Element {

    const { currentTheme } = useCurrentTheme()
    const { t } = useTranslation()

    return (
        <>
            <Head>
                <title>Home | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Header />
                <DesktopHeader />
                <NavBar />
                <Gallery arts={arts} />
            </ThemeProvider>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    // Tells backend to create an admin user if it does not exists
    await apolloClient.query({
        query: gql`
            query GetUser {
                getUser {
                    id
                    username
                    password
                }
            }
        `
    })

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
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 60 * 60 * 24, // = 24 hours
        }
    } catch (error) {

        return {
            props: {
                arts: [],
                error: error.message,
                ...(await serverSideTranslations(locale, ['common'])),
            }
        }
    }
}