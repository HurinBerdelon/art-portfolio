import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Gallery } from "../../components/Gallery";
import { Header } from "../../components/Header";
import { DesktopHeader } from "../../components/Header/DesktopHeader";
import { NavBar } from "../../components/NavBar";
import { useArts } from "../../hooks/useArts";
import { useCurrentTheme } from "../../hooks/useTheme";
import { ArtSchema } from "../../schemas/Art";
import { apolloClient } from "../../services/apolloClient";

interface ByCategoryPageProps {
    arts: ArtSchema[]
    numberOfArts: number
}

export default function ByCategoryPage({ arts, numberOfArts }: ByCategoryPageProps): JSX.Element {

    const router = useRouter()
    const { setArts, fetchNextCategoryArtsPage } = useArts()
    const { currentTheme } = useCurrentTheme()

    const category = router.asPath.split('/')[1]

    useEffect(() => {
        setArts(arts)
    }, [arts])

    // string.capitalize()
    const title = router.asPath.split('/')[1].replace(/^\w/, (c) => c.toUpperCase())

    return (

        <>
            <Head>
                <title>{title} | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Header />
                <DesktopHeader />
                <NavBar />
                <Gallery fetchNextPageForCategory={fetchNextCategoryArtsPage} categoryPage={category} numberOfArts={numberOfArts} />
            </ThemeProvider>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {

    const response = await apolloClient.query({
        query: gql`
            query GetCategories {
                getCategories {
                    title
                }
            }
        `
    })


    const paths = response.data.getCategories.map(category => locales.map(locale => {
        return {
            params: { category: category.title },
            locale
        }
    })).flat()

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {

    const { category } = params

    try {
        const { data } = await apolloClient.query({
            query: gql`
                query ArtsByCategory {
                    artsByCategory(
                        category: "${String(category).replace('-', '_')}",
                        skip: 0,
                        take: 5
                    ) {
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

        const { data: numberOfArtsData } = await apolloClient.query({
            query: gql`
                query NumberOfArts {
                    numberOfArts (categoryTitle: "${category}") 
                }
            `
        })

        return {
            props: {
                arts: data.artsByCategory,
                numberOfArts: numberOfArtsData.numberOfArts,
                key: category,
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 60 * 60 * 24 // = 24 hours
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