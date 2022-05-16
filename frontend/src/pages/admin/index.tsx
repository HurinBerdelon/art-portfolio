import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { ListOfArts } from "../../components/admin/ListOfArts";
import { NewArtButton } from "../../components/admin/NewArtButton";
import { CreateArtModal } from "../../components/Modals/CreateArtModal";
import { NavBar } from "../../components/NavBar";
import { ArtSchema } from "../../schemas/Art";
import { apolloClient } from "../../services/apolloClient";
import { Container } from "./style";

interface AdminProps {
    arts: ArtSchema[]
}

export default function Admin({ arts }: AdminProps): JSX.Element {

    const [isCreateArtModalOpen, setIsCreateArtModalOpen] = useState(false)

    function handleToggleCreateArtModal() {
        setIsCreateArtModalOpen(!isCreateArtModalOpen)
    }

    return (
        <>
            <Head>
                <title>Admin | HurinBerdelon</title>
            </Head>
            <NavBar
            // currentPage={currentPage} setCurrentPage={setCurrentPage} 
            />

            <Container>
                <div className="newArtButton">
                    <NewArtButton handleToggleCreateArtModal={handleToggleCreateArtModal} />
                </div>
                <ListOfArts arts={arts} />
            </Container>

            <CreateArtModal
                isOpen={isCreateArtModalOpen}
                onRequestClose={handleToggleCreateArtModal}
            />
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