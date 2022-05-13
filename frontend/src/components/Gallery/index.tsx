import { assertSchema } from "graphql";
import { useEffect, useState } from "react";
import { ArtSchema } from "../../schemas/Art";
import { GalleryModal } from "../GalleryModal";
import { Container } from "./style";

interface GalleryProps {
    arts: ArtSchema[]
}

export interface OrderedArts extends ArtSchema {
    order: number
}

export function Gallery({ arts }: GalleryProps): JSX.Element {

    const [pictures, setPictures] = useState<OrderedArts[]>([])

    const array: OrderedArts[] = []

    let index = 1
    arts.map(art => {
        array.push({
            ...art,
            order: index
        })
        index += 1
    })

    useEffect(() => {
        setPictures(array)
    }, array)


    const [currentPicture, setCurrentPicture] = useState({} as OrderedArts)

    const [isGalleyModalOpen, setIsGalleryModalOpen] = useState(false)

    function handleToggleGalleyModal() {
        setIsGalleryModalOpen(!isGalleyModalOpen)
    }

    return (
        <Container>
            <GalleryModal
                isOpen={isGalleyModalOpen}
                onRequestClose={handleToggleGalleyModal}
                currentPicture={currentPicture}
                setCurrentPicture={setCurrentPicture}
                arts={pictures}
            />
            {pictures.map(picture => {
                return (
                    <div
                        key={picture.id}
                        onClick={() => {
                            setCurrentPicture(picture)
                            handleToggleGalleyModal()
                        }}
                        className='card'
                    >
                        <div
                            className='content'
                        >
                            <img src={picture.image} alt={picture.title} />
                        </div>
                    </div>
                )
            })}
        </Container>
    )
}