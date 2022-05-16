import { useMutation, gql } from "@apollo/client"
import { FormEvent, useState } from "react"
import Modal from 'react-modal'
import { ArtSchema } from "../../../schemas/Art"
import { Container } from "./style"

const UPDATE_ART = gql`
    mutation(
        $file: Upload!,
        $uniqueCode: String!,
        $description: String!,
        $dimension: String!,
        $title: String!,
        $productionDate: DateTime!
        ) {
            updateArt(
                file: $file,
                uniqueCode: $uniqueCode, 
                description: $description, 
                dimension: $dimension, 
                title: $title,
                productionDate: $productionDate)
        }`

interface UpdateArttModalProps {
    isOpen: boolean
    onRequestClose(): void
    art: ArtSchema
}

export function UpdateArtModal({ isOpen, onRequestClose, art }: UpdateArttModalProps): JSX.Element {

    const [image, setImage] = useState<any>()
    const [uniqueCode, setUniqueCode] = useState('')
    const [description, setDescription] = useState('')
    const [dimension, setDimension] = useState('')
    const [title, setTitle] = useState('')
    const [productionDate, setProductionDate] = useState<Date>()

    const [updateArt] = useMutation(UPDATE_ART)

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault()

        updateArt({
            variables: {
                file: image,
                uniqueCode,
                description,
                dimension,
                title,
                productionDate
            }
        })

        onRequestClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className={'react-modal-content'}
        >

            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
            >
                <img src="/images/close.svg" alt="close-modal-button" />
            </button>

            <Container>
                <h1>Upload File</h1>
                <div>
                    <img src={art.image} alt={art.title} />
                    <form
                        onSubmit={handleSubmitForm}
                    >
                        <input
                            type="text"
                            placeholder="Title"
                            value={art.title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="UniqueCode"
                            value={art.uniqueCode}
                            onChange={(event) => setUniqueCode(event.target.value)}
                        />
                        <textarea
                            placeholder="Description"
                            value={art.description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Dimension"
                            value={art.dimension}
                            onChange={(event) => setDimension(event.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Production Date"
                            onChange={(event) => setProductionDate(new Date(event.target.value))}
                        />

                        {/* <input type='file' onChange={(event) => setImage(event.target.files[0])} /> */}

                        <button type="submit">
                            Update
                        </button>
                    </form>
                </div>

            </Container>


        </Modal>

    )
}