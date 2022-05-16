import Modal from 'react-modal'
import { FacebookShareButton, FacebookIcon } from 'react-share'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { OrderedArts } from "../Gallery";
import { Container } from "./style";
import { ShareButton } from '../ShareButtons';


interface GalleryModalProps {
    isOpen: boolean
    onRequestClose(): void
    currentPicture: OrderedArts
    setCurrentPicture(currentPicture: OrderedArts): void
    arts: OrderedArts[]
}


export function GalleryModal({ isOpen, onRequestClose, currentPicture, setCurrentPicture, arts }: GalleryModalProps): JSX.Element {

    function handleNextPicture(order: number) {
        const newPicture = arts.find(picture => picture.order === order)

        if (!newPicture) {
            const firstPicture = arts.find(picture => picture.order === 1)
            setCurrentPicture(firstPicture)
        } else {
            setCurrentPicture(newPicture)
        }
    }

    function handlePreviousPicture(order: number) {
        const newPicture = arts.find(picture => picture.order === order)

        if (!newPicture) {
            const firstPicture = arts.find(picture => picture.order === arts.length)
            setCurrentPicture(firstPicture)
        } else {
            setCurrentPicture(newPicture)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            // appElement={document.getElementById('__next')}
            className='react-modal-content'
        >

            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
            >
                <img src="/images/close.svg" alt="close-modal-button" />
            </button>

            <Container>
                <section className="imageContainer">
                    <button
                        className="buttonPrevious"
                        onClick={() => handlePreviousPicture(currentPicture.order - 1)}
                    >
                        <Tooltip title='Previous Picture'>
                            <ArrowBackIosIcon />
                        </Tooltip>
                    </button>
                    <img src={currentPicture.image} alt={currentPicture.title} />
                    <button
                        className="buttonNext"
                        onClick={() => handleNextPicture(currentPicture.order + 1)}
                    >
                        <Tooltip title='Next Picture'>
                            <ArrowForwardIosIcon />
                        </Tooltip>
                    </button>
                </section>

                <section className="infoContainer">
                    <div className="infos">

                        <h2>{currentPicture.title}</h2>
                        <p className='dateInfo'>{dayjs(currentPicture.productionDate).format('MMMM [of] YYYY')}</p>
                        <p className="dimensionInfo">{currentPicture.dimension}</p>
                        <p className='descriptionInfo'>{currentPicture.description}</p>
                    </div>

                    <div className="shareMedia">
                        <ShareButton currentPictureId={currentPicture.id} />
                    </div>
                </section>
            </Container>
        </Modal>
    )
}