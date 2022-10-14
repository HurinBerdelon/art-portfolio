import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { TextContentSchema } from "../../../../schemas/TextContent";
import { ModalContentOverlay } from "../../../../styles/global";
import { DeleteAbout } from "./DeleteAbout";
import { Container } from "./style";
import { UpdateAbout } from "./UpdateAbout";

interface SettingsAboutProps {
    isOpen: boolean
    onRequestClose(): void
    textContentOnUpdate: TextContentSchema
}

export function SettingsAbout({ isOpen, onRequestClose, textContentOnUpdate }: SettingsAboutProps): JSX.Element {


    const [isCardFlipped, setIsCardFlipped] = useState(false)

    useEffect(() => {
        setIsCardFlipped(false)
    }, [onRequestClose])

    if (!textContentOnUpdate) {
        return null
    }

    return (
        <Dialog open={isOpen} onClose={onRequestClose}>
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
                        <UpdateAbout
                            textContentOnUpdate={textContentOnUpdate}
                            onRequestClose={onRequestClose}
                            setIsCardFlipped={setIsCardFlipped}
                        />
                        <DeleteAbout
                            textContentOnUpdate={textContentOnUpdate}
                            onRequestClose={onRequestClose}
                            setIsCardFlipped={setIsCardFlipped}
                        />

                    </ReactCardFlip>



                </Container>
            </Dialog.Panel>
        </Dialog>
    )
}