import { useEffect, useState } from "react"
import ReactCardFlip from 'react-card-flip'
import { Dialog } from "@headlessui/react"
import { ArtSchema } from "../../../schemas/Art"
import { Container } from "./style"
import { ModalContentOverlay } from "../../../styles/global"
import { UpdateArt } from "./UpdateArt"
import { DeleteArt } from "./DeleteArt"

interface SettingsArtModalProps {
    isOpen: boolean
    onRequestClose(): void
    art: ArtSchema
}

export function SettingsArtModal({ isOpen, onRequestClose, art }: SettingsArtModalProps): JSX.Element {

    if (!art) {
        return null
    }

    const [isCardFlipped, setIsCardFlipped] = useState(false)

    useEffect(() => {
        setIsCardFlipped(false)
    }, [onRequestClose])

    return (
        <Dialog open={isOpen} onClose={onRequestClose} >
            <ModalContentOverlay aria-hidden={true} />
            <Dialog.Panel>
                <Container>
                    <button
                        type='button'
                        onClick={onRequestClose}
                        className='react-modal-close'
                    >
                        <img src="/images/close.svg" alt="close-modal-button" />
                    </button>

                    <ReactCardFlip
                        isFlipped={isCardFlipped}
                        flipDirection={'horizontal'}
                    >
                        <UpdateArt
                            art={art}
                            onRequestClose={onRequestClose}
                            setIsCardFlipped={setIsCardFlipped}
                        />
                        <DeleteArt
                            art={art}
                            onRequestClose={onRequestClose}
                            setIsCardFlipped={setIsCardFlipped}
                        />

                    </ReactCardFlip>


                </Container>
            </Dialog.Panel>


        </Dialog>

    )
}