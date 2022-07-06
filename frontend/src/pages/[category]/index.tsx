import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { Gallery } from "../../components/Gallery";
import { Header } from "../../components/Header";
import { useCurrentTheme } from "../../hooks/useTheme";
import { ArtSchema } from "../../schemas/Art";
import { apolloClient } from "../../services/apolloClient";

interface ByCategoryPageProps {
    arts: ArtSchema[]
}

export default function ByCategoryPage({ arts }: ByCategoryPageProps): JSX.Element {

    const router = useRouter()
    const { currentTheme } = useCurrentTheme()

    // string.capitalize()
    const title = router.asPath.split('/')[1].replace(/^\w/, (c) => c.toUpperCase())

    return (

        <>
            <Head>
                <title>{title} | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Header />
                <Gallery arts={arts} />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { category } = params

    try {
        const { data } = await apolloClient.query({
            query: gql`
                query ArtsByCategory {
                    artsByCategory(category: "${String(category).replace('-', '_')}") {
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
                arts: data.artsByCategory,
                key: category
            },
            revalidate: 60 * 60 * 24 // = 24 hours
        }
    } catch (error) {

        return {
            props: {
                arts: [],
                error: error.message
            }
        }
    }
}