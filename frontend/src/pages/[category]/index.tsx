import { gql } from "@apollo/client";
import { GetServerSideProps, GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Gallery } from "../../components/Gallery";
import { Header } from "../../components/Header";
import { DesktopHeader } from "../../components/Header/DesktopHeader";
import { NavBar } from "../../components/NavBar";
import { artsPerPage } from "../../config/pagination";
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
    }, [arts, setArts])

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

export const getServerSideProps: GetServerSideProps = async ({ params, locale, locales }) => {

    const { category } = params

    const response = await apolloClient.query({
        query: gql`
            query GetCategories {
                getCategories {
                    title
                }
            }
        `,
    })

    const isCategory = response.data.getCategories.find(item => item.title === category)

    if (!isCategory) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    try {
        const { data } = await apolloClient.query({
            query: gql`
                query ArtsByCategory {
                    artsByCategory(
                        category: "${String(category).replace('-', '_')}",
                        skip: 0,
                        take: ${artsPerPage}
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
            `,
            fetchPolicy: "no-cache"
        })

        const { data: numberOfArtsData } = await apolloClient.query({
            query: gql`
                query NumberOfArts {
                    numberOfArts (categoryTitle: "${category}") 
                }
            `,
            fetchPolicy: "no-cache"
        })

        return {
            props: {
                arts: data.artsByCategory,
                numberOfArts: numberOfArtsData.numberOfArts,
                key: category,
                ...(await serverSideTranslations(locale, ['common'])),
            },
            // revalidate: 60 * 60 * 24 // = 24 hours
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