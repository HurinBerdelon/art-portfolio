import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArtSchema } from "../../../schemas/Art";
import { UpdateArtModal } from "../../Modals/updateArtModal";
import { Container } from "./style";
import { Tooltip } from "@mui/material";
import { apolloClient } from "../../../services/apolloClient";
import { gql } from "@apollo/client";

interface ListOfArtsProps {
    arts: ArtSchema[]
}

export function ListOfArts({ arts }: ListOfArtsProps): JSX.Element {

    const [isUpdateArtModalOpen, setIsUpdateArtModalOpen] = useState(false)
    const [currentArt, setCurrentArt] = useState({} as ArtSchema)

    async function handleDeleteArt(id: string) {
        console.log('delete')
        await apolloClient.query({
            query: gql`
                query DeleteArt{
                    deleteArt(id: "${id}") 
                }
            `
        })
    }

    function handleToggleUpdateArtModal() {
        setIsUpdateArtModalOpen(!isUpdateArtModalOpen)
    }

    return (
        <Container>
            <ul>
                <li>
                    <div></div>
                    <div></div>
                    <h3>Image</h3>
                    <h3>UniqueCode</h3>
                    <h3>Tittle</h3>
                    <h3>Description</h3>
                </li>
                {arts.map(art => (
                    <li key={art.id}>
                        <Tooltip title='Edit Art'>
                            <EditIcon
                                className="editIcon"
                                onClick={() => {
                                    setCurrentArt(art)
                                    handleToggleUpdateArtModal()
                                }}
                            />
                        </Tooltip>

                        <Tooltip title='Delete Art'>
                            <DeleteIcon
                                className="deleteIcon"
                                onClick={() => handleDeleteArt(art.id)}
                            />
                        </Tooltip>
                        <div>
                            <img src={art.image} alt={art.title} />
                        </div>
                        <h4>{art.uniqueCode}</h4>
                        <h3>{art.title}</h3>
                        <p>{art.description}</p>
                    </li>
                ))}
            </ul>



            <UpdateArtModal
                isOpen={isUpdateArtModalOpen}
                onRequestClose={handleToggleUpdateArtModal}
                art={currentArt}
            />


        </Container>
    )
}