import { useMutation, gql } from "@apollo/client"
import { FormEvent, useEffect, useState } from "react"
import Modal from 'react-modal'
import { ArtSchema } from "../../../schemas/Art"
import { Container } from "./style"

const CREATE_ART = gql`
    mutation(
        $file: Upload!,
        $uniqueCode: String!,
        $description: String!,
        $dimension: String!,
        $title: String!,
        $productionDate: DateTime!
        ) {
            saveArt(
                file: $file,
                uniqueCode: $uniqueCode, 
                description: $description, 
                dimension: $dimension, 
                title: $title,
                productionDate: $productionDate)
        }`

interface CreateArtModalProps {
    isOpen: boolean
    onRequestClose(): void
}

export function CreateArtModal({ isOpen, onRequestClose }: CreateArtModalProps): JSX.Element {

    const [image, setImage] = useState<any>()
    const [uniqueCode, setUniqueCode] = useState('')
    const [description, setDescription] = useState('')
    const [dimension, setDimension] = useState('')
    const [title, setTitle] = useState('')
    const [productionDate, setProductionDate] = useState<Date>()

    const [saveArt] = useMutation(CREATE_ART)

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault()

        saveArt({
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
                <h2>Save New Art</h2>
                <form
                    onSubmit={handleSubmitForm}
                >
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="UniqueCode"
                        value={uniqueCode}
                        onChange={(event) => setUniqueCode(event.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Dimension"
                        value={dimension}
                        onChange={(event) => setDimension(event.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Production Date"
                        onChange={(event) => setProductionDate(new Date(event.target.value))}
                    />

                    <input type='file' onChange={(event) => setImage(event.target.files[0])} />

                    <button type="submit">
                        Save
                    </button>
                </form>
            </Container>

        </Modal >

    )
}