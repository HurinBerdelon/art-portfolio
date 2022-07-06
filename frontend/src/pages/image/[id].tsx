import { gql } from "@apollo/client"
import Head from "next/head"
import { GetServerSideProps } from "next/types"
import { ThemeProvider } from "styled-components"
import { ImageContainer } from "../../components/Gallery/ImageContainer"
import { InfoContainer } from "../../components/Gallery/InfoContainer"
import { Header } from "../../components/Header"
import { useCurrentTheme } from "../../hooks/useTheme"
import { ArtSchema } from "../../schemas/Art"
import { apolloClient } from "../../services/apolloClient"
import { Container } from "./style"

interface SinglePictureProps {
    art: ArtSchema
}

export default function SinglePicture({ art }: SinglePictureProps): JSX.Element {

    const { currentTheme } = useCurrentTheme()

    return (
        <>
            <Head>
                <title>{`${art.title} | FeCardozo Workshop`}</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Container>
                    <Header />
                    <main>
                        <ImageContainer currentArt={art} />
                        <InfoContainer currentArt={art} />
                    </main>
                </Container>
            </ThemeProvider>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.params

    const { data } = await apolloClient.query({
        query: gql`
            query ArtById {
                artById(id: "${id}") {
                    id
                    title
                    description
                    categoryTitle
                    image
                    dimension
                    uniqueCode
                    productionDate
                    createdAt
                    updatedAt
                }
            }
        `})


    return {
        props: {
            art: data.artById
        }
    }
}