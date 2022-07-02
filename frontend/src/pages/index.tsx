import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { Gallery } from "../components/Gallery";
import { Header } from "../components/Header";
import { ArtSchema } from "../schemas/Art";
import { apolloClient } from "../services/apolloClient";
import light from '../styles/themes/light'

interface HomeProps {
    arts: ArtSchema[]
}

export default function Home({ arts }: HomeProps): JSX.Element {

    return (
        <>
            <Head>
                <title>Home | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={light}>
                <Header />
                <Gallery arts={arts} />
            </ThemeProvider>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

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
                arts: data.arts
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