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
import { useArts } from "../hooks/useArts";
import { useEffect } from "react";
import { artsPerPage } from "../config/pagination";

interface HomeProps {
    arts: ArtSchema[]
    numberOfArts: number
}

export default function Home({ arts, numberOfArts }: HomeProps): JSX.Element {

    const { currentTheme } = useCurrentTheme()
    const { setArts, fetchNextArtsPage } = useArts()
    const { t } = useTranslation()

    useEffect(() => {
        setArts(arts)
    }, [arts, setArts])

    return (
        <>
            <Head>
                <title>Home | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Header />
                <DesktopHeader />
                <NavBar />
                <Gallery fetchNextPage={fetchNextArtsPage} numberOfArts={numberOfArts} />
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
        `,
        fetchPolicy: "no-cache"
    })

    try {
        const { data } = await apolloClient.query({
            query: gql`
                query ArtsPaginated {
                    artsPaginated (take: ${artsPerPage}, skip: 0) {
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
            `,
            fetchPolicy: "no-cache"
        })

        const { data: numberOfArtsData } = await apolloClient.query({
            query: gql`
                query NumberOfArts {
                    numberOfArts (categoryTitle: "undefined") 
                }
            `,
            fetchPolicy: "no-cache"
        })

        return {
            props: {
                arts: data.artsPaginated,
                numberOfArts: numberOfArtsData.numberOfArts,
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