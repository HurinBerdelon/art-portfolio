import { Dialog } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import dayjs from "dayjs";
import { ArtSchema } from "../../../schemas/Art";
import { Container, ContentOverlay } from "./style";
import { ShareButton } from "../../ShareButtons";
import { useEffect, useState } from "react";
import { ImageContainer } from "../ImageContainer";
import { InfoContainer } from "../InfoContainer";

interface GalleryModalProps {
    currentArt: ArtSchema
    setCurrentArt(currentArt: ArtSchema): void
    arts: ArtSchema[]
    isOpen: boolean
    setIsOpen(isOpen: boolean): void
}

export function GalleryModal({ arts, currentArt, isOpen, setCurrentArt, setIsOpen }: GalleryModalProps): JSX.Element {

    if (!currentArt) {
        return (null)
    }

    const [currentIndex, setCurrentIndex] = useState(arts.indexOf(currentArt))

    useEffect(() => {
        setCurrentIndex(arts.indexOf(currentArt))
    }, [currentArt])

    function handleCloseModal() { setIsOpen(false) }

    function handleNextPicture(index: number) {
        const nextPicture = arts[index]

        if (!nextPicture) {
            const firstPicture = arts[0]
            setCurrentArt(firstPicture)
        } else {
            setCurrentArt(nextPicture)
        }
    }

    function handlePreviousPicture(index: number) {
        const prevPicture = arts[index]

        if (!prevPicture) {
            const firstPicture = arts[arts.length - 1]
            setCurrentArt(firstPicture)
        } else {
            setCurrentArt(prevPicture)
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleCloseModal}>
            <ContentOverlay className="contentOverlay" aria-hidden={true}></ContentOverlay>
            <Dialog.Panel>
                <Container>
                    <button
                        type='button'
                        onClick={handleCloseModal}
                        className='react-modal-close'
                    >
                        <img src="/images/close.svg" alt="close-modal-button" />
                    </button>

                    <ImageContainer
                        artIndex={currentIndex}
                        currentArt={currentArt}
                        handleNextPicture={handleNextPicture}
                        handlePreviousPicture={handlePreviousPicture}
                    />

                    <InfoContainer currentArt={currentArt} />
                </Container>
            </Dialog.Panel>
        </Dialog>
    )
}