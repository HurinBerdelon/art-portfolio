import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { ArtSchema } from "../../../schemas/Art";
import { UpdateArtModal } from "../Modals/UpdateArtModal";
import { Container } from "./style";
import { Tooltip } from "@mui/material";
import { apolloClient } from "../../../services/apolloClient";
import { gql } from "@apollo/client";
import { ArtInfo } from "./ArtInfo";

interface ListOfArtsProps {
    arts: ArtSchema[]
    setArts(arts: ArtSchema[]): void
}

export function ListOfArts({ arts, setArts }: ListOfArtsProps): JSX.Element {

    const [isUpdateArtModalOpen, setIsUpdateArtModalOpen] = useState(false)
    const [currentArt, setCurrentArt] = useState({} as ArtSchema)

    async function handleDeleteArt(id: string) {

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
                    <h3>Category</h3>
                    <h3>
                        Tittle
                        {/* <input
                            type="search"
                            onChange={(event) => setArts(
                                arts.filter(art => {
                                    if (art.title.toLowerCase().includes(event.target.value.toLowerCase())) {
                                        return art
                                    }
                                })
                            )}
                        /> */}
                    </h3>
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
                        <h4 className="uniqueCode">
                            {art.uniqueCode}
                            <Tooltip title={<ArtInfo art={art} />}>
                                <InfoIcon className="infoIcon" />
                            </Tooltip>
                        </h4>
                        <h4>
                            {art.category
                                .replace('_', ' ')
                                // string.capitalize() to each word => string-art => String Art
                                .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
                            }
                        </h4>
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