import { gql } from "@apollo/client";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { ListOfArts } from "../components/ListOfArts";
import { NavBar } from "../components/NavBar";
import { ArtSchema } from "../schemas/Art";
import { apolloClient } from "../services/apolloClient";

interface AdminProps {
    arts: ArtSchema[]
}

export default function Admin({ arts }: AdminProps): JSX.Element {

    return (
        <>
            <Head>
                <title>Admin | HurinBerdelon</title>
            </Head>
            <NavBar
            // currentPage={currentPage} setCurrentPage={setCurrentPage} 
            />
            <ListOfArts arts={arts} />
        </>

    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const { data } = await apolloClient.query({
        query: gql`
        query Arts {
            arts {
                id
                title
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
        }
    }
}