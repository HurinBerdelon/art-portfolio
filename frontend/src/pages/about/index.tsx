import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { AboutContent } from "../../components/AboutContent";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { NavBar } from "../../components/NavBar";
import { useCurrentTheme } from "../../hooks/useTheme";
import { TextContentSchema } from "../../schemas/TextContent";
import { apolloClient } from "../../services/apolloClient";
import { Container } from "./style";

interface AboutProps {
    aboutContent: TextContentSchema[]
}

export default function About({ aboutContent }: AboutProps): JSX.Element {

    const { currentTheme } = useCurrentTheme()

    return (
        <>
            <Head>
                <title>About | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Container>
                    <Header />
                    <NavBar />
                    <AboutContent aboutContent={aboutContent} />
                    <Footer />
                </Container>
            </ThemeProvider>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    try {
        const { data } = await apolloClient.query({
            query: gql`
                query GetTextContentsByPage {
                    getTextContentsByPage(page: "about") {
                        id
                        type
                        text
                        idiom
                        imageUrl
                        updatedAt
                    }
                }
            `
        })

        return {
            props: {
                aboutContent: data.getTextContentsByPage
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

    return {
        props: {}
    }
}