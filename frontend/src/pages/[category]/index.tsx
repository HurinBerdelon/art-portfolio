import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Gallery } from "../../components/Gallery";
import { NavBar } from "../../components/NavBar";
import { ArtSchema } from "../../schemas/Art";
import { apolloClient } from "../../services/apolloClient";

interface ByCategoryPageProps {
    arts: ArtSchema[]
}

export default function ByCategoryPage({ arts }: ByCategoryPageProps): JSX.Element {

    const router = useRouter()

    // string.capitalize()
    const title = router.asPath.split('/')[1].replace(/^\w/, (c) => c.toUpperCase())

    return (

        <>
            <Head>
                <title>{title} | HurinBerdelon</title>
            </Head>

            <NavBar />
            <Gallery arts={arts} />
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const data = await apolloClient.query({
        query: gql`
            query GetCategories {
                getCategories {
                    title
                }
            }
        `
    })

    const paths = data.data.getCategories.map(category => {
        return { params: { category: category.title } }
    })

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