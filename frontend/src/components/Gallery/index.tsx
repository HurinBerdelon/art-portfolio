import Link from "next/link";
import { useState } from "react";
import { ArtSchema } from "../../schemas/Art";
import { GalleryModal } from "./GalleryModal";
import { Container, NoArtsContainer } from "./style";

interface GalleryProps {
    arts: ArtSchema[]
}

export function Gallery({ arts }: GalleryProps): JSX.Element {

    const [artsOnScreen, setArtsOnScreen] = useState<ArtSchema[]>(arts)
    const [currentArt, setCurrentArt] = useState<ArtSchema>(null)
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)

    if (arts.length === 0) {
        return (
            <NoArtsContainer>
                No arts Here yet
            </NoArtsContainer>
        )
    }

    return (
        <Container>

            <GalleryModal
                arts={arts}
                currentArt={currentArt}
                isOpen={isGalleryModalOpen}
                setCurrentArt={setCurrentArt}
                setIsOpen={setIsGalleryModalOpen}
            />

            {artsOnScreen.map(art => (
                <Link
                    href={`/image/${art.id}`}
                    key={art.id}
                >
                    <a
                        onClick={(event) => {
                            event.preventDefault()
                            setCurrentArt(art)
                            setIsGalleryModalOpen(true)
                        }}
                        className='card'
                    >
                        <div className='content'>
                            <img src={art.image} alt={art.title} />
                        </div>
                    </a>
                </Link>
            ))}
        </Container>
    )
}