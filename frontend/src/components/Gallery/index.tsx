import Link from "next/link";
import { useState } from "react";
import { ArtSchema } from "../../schemas/Art";
import { GalleryModal } from "../GalleryModal";
import { Container } from "./style";

interface GalleryProps {
    arts: ArtSchema[]
}

export function Gallery({ arts }: GalleryProps): JSX.Element {

    const [pictures, setPictures] = useState<ArtSchema[]>(arts)

    const [currentPicture, setCurrentPicture] = useState({} as ArtSchema)

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
                    <Link
                        href={`/image/${picture.id}`}
                        key={picture.id}
                    >
                        <a
                            onClick={(event) => {
                                event.preventDefault()
                                setCurrentPicture(picture)
                                handleToggleGalleyModal()
                            }}
                            className='card'
                        >
                            <div className='content'>
                                <img src={picture.image} alt={picture.title} />
                            </div>
                        </a>
                    </Link>
                )
            })}
        </Container>
    )
}