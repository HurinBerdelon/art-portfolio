import { useState } from "react";
import { ArtSchema } from "../../schemas/Art";
import { CreateArtModal } from "../Modals/CreateArtModal";
import { UpdateArtModal } from "../Modals/updateArtModal";
import { Container } from "./style";

interface ListOfArtsProps {
    arts: ArtSchema[]
}

export function ListOfArts({ arts }: ListOfArtsProps): JSX.Element {

    const [isCreateArtModalOpen, setIsCreateArtModalOpen] = useState(false)
    const [isUpdateArtModalOpen, setIsUpdateArtModalOpen] = useState(false)
    const [currentArt, setCurrentArt] = useState({} as ArtSchema)

    function handleToggleCreateArtModal() {
        setIsCreateArtModalOpen(!isCreateArtModalOpen)
    }

    function handleToggleUpdateArtModal() {
        setIsUpdateArtModalOpen(!isUpdateArtModalOpen)
    }

    return (
        <Container>
            <ul>
                <li>
                    <h3>Image</h3>
                    <h3>UniqueCode</h3>
                    <h3>Tittle</h3>
                    <h3>Description</h3>
                </li>
                {arts.map(art => (
                    <li key={art.id}>
                        <div>
                            <img src={art.image} alt={art.description} />
                        </div>
                        <h4>{art.uniqueCode}</h4>
                        <h3>{art.title}</h3>
                        <p>{art.description}</p>
                        <button
                            onClick={() => {
                                setCurrentArt(art)
                                handleToggleUpdateArtModal()
                            }}
                        >
                            Update
                        </button>
                    </li>
                ))}
            </ul>

            <button
                type='button'
                className='newArt'
                onClick={handleToggleCreateArtModal}
            >
                Add New Art
            </button>

            <UpdateArtModal
                isOpen={isUpdateArtModalOpen}
                onRequestClose={handleToggleUpdateArtModal}
                art={currentArt}
            />

            <CreateArtModal
                isOpen={isCreateArtModalOpen}
                onRequestClose={handleToggleCreateArtModal}
            />
        </Container>
    )
}