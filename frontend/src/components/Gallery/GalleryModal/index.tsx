import { Dialog } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import dayjs from "dayjs";
import { ArtSchema } from "../../../schemas/Art";
import { Container, ContentOverlay } from "./style";
import { ShareButton } from "../../ShareButtons";

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


                    <section className="imageContainer">
                        <button
                            className="buttonPrevious"
                            onClick={() => handlePreviousPicture(arts.indexOf(currentArt) - 1)}
                        >
                            <Tooltip title='Previous Picture'>
                                <ArrowBackIosIcon />
                            </Tooltip>
                        </button>
                        <img src={currentArt.image} alt={currentArt.title} />
                        <button
                            className="buttonNext"
                            onClick={() => handleNextPicture(arts.indexOf(currentArt) + 1)}
                        >
                            <Tooltip title='Next Picture'>
                                <ArrowForwardIosIcon />
                            </Tooltip>
                        </button>
                    </section>

                    <section className="infoContainer">
                        <div className="infos">

                            <h2>{currentArt.title}</h2>
                            <p className='dateInfo'>{dayjs(currentArt.productionDate).format('MMMM [of] YYYY')}</p>
                            <p className="dimensionInfo">{currentArt.dimension}</p>
                            <p className="categoryInfo">{currentArt.categoryTitle}</p>
                            <p className='descriptionInfo'>{currentArt.description}</p>
                        </div>

                        <div className="shareMedia">
                            <ShareButton currentPictureId={currentArt.id} />
                        </div>
                    </section>
                </Container>
            </Dialog.Panel>
        </Dialog>
    )
}