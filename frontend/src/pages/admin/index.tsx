import { useState } from "react";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { hash } from 'bcrypt'
import { ListOfArts } from "../../components/admin/ListOfArts";
import { NewArtButton } from "../../components/admin/NewArtButton";
import { CreateArtModal } from "../../components/admin/Modals/CreateArtModal";
import { NavBar } from "../../components/NavBar";
import { apolloClient } from "../../services/apolloClient";
import { Container } from "./style";


export default function Admin(): JSX.Element {

    const [isCreateArtModalOpen, setIsCreateArtModalOpen] = useState(false)

    function handleToggleCreateArtModal() {
        setIsCreateArtModalOpen(!isCreateArtModalOpen)
    }

    return (
        <>
            <Head>
                <title>Admin | HurinBerdelon</title>
            </Head>
            <NavBar />

            <Container>
                <div className="newArtButton">
                    <NewArtButton handleToggleCreateArtModal={handleToggleCreateArtModal} />
                </div>
                <ListOfArts />
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
            query GetUser {
                getUser {
                    username
                    password
                }
            }
        `
    })

    let user: { username: string, password: string }

    if (data.getUser.length === 0) {

        const passwordHash = await hash('admin', 8)

        const { data } = await apolloClient.mutate({
            mutation: gql`
                mutation CreateUser {
                    createUser(username: "admin", password: "${passwordHash}", ) {
                        id
                        username
                        password
                    }
                }
            `
        })

        user = data.createUser

    } else {
        [user] = data.getUser
    }

    return {
        props: {

        }
    }

    // try {
    //     const { data } = await apolloClient.query({
    //         query: gql`
    //             query Arts {
    //                 arts {
    //                     id
    //                     title
    //                     category
    //                     description
    //                     image
    //                     dimension
    //                     uniqueCode
    //                     productionDate
    //                 }
    //             }
    //         `
    //     })

    //     return {
    //         props: {
    //             arts: data.arts
    //         }
    //     }
    // } catch (error) {
    //     return {
    //         props: {
    //             arts: [],
    //             error: error.message
    //         }
    //     }
    // }
}