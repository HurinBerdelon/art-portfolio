import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import { artsPerPage } from "../../config/pagination";
import { useArts } from "../../hooks/useArts";
import { ArtSchema } from "../../schemas/Art";
import { GalleryModal } from "./GalleryModal";
import { Container, NoArtsContainer } from "./style";

interface GalleryProps {
    numberOfArts: number
    fetchNextPage?: (skip: number, take: number) => void
    fetchNextPageForCategory?: (category: string, skip: number, take: number) => void
    categoryPage?: string
}

export function Gallery({ fetchNextPage, fetchNextPageForCategory, numberOfArts, categoryPage = undefined }: GalleryProps): JSX.Element {

    const { arts } = useArts()

    const [currentArt, setCurrentArt] = useState<ArtSchema>(null)
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const { t } = useTranslation()

    function handleNextPage() {
        if (categoryPage) fetchNextPageForCategory(categoryPage, currentPage * artsPerPage, artsPerPage)
        else fetchNextPage(currentPage * artsPerPage, artsPerPage)
        setCurrentPage(prevValue => prevValue + 1)
    }

    if (arts?.length === 0) {
        return (
            <NoArtsContainer>
                {t('common:nothingHereYet')}
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

            <div className="galleryContent">
                {arts?.map(art => (
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
            </div>

            {arts?.length < numberOfArts && (
                <button className="LoadMoreButton" onClick={handleNextPage}>
                    {t('common:loadMore')}
                </button>
            )}
        </Container>
    )
}