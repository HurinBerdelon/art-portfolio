import * as yup from 'yup'
import { Dialog } from "@headlessui/react"
import { Field, Form, Formik, FormikValues } from "formik"
import { useRouter } from "next/router"
import ReactCardFlip from 'react-card-flip'
import { ModalContentOverlay } from "../../../styles/global"
import { Container } from "./style"
import { CategorySchema } from '../../../schemas/Category'
import { languages } from '../../../config/languages'
import { useCategory } from '../../../hooks/useCategory'
import { useEffect, useState } from 'react'
import { UpdateCategory } from './UpdateCategory'
import { DeleteCategory } from './DeleteCategory'

interface SettingsCategoryModalProps {
    isOpen: boolean
    category: CategorySchema
    onRequestClose(): void
}

export function SettingsCategoryModal({ isOpen, onRequestClose, category }: SettingsCategoryModalProps): JSX.Element {

    if (!category) {
        return null
    }

    const [isCardFlipped, setIsCardFlipped] = useState(false)

    useEffect(() => {
        setIsCardFlipped(false)
    }, [onRequestClose])

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
                        <UpdateCategory
                            category={category}
                            onRequestClose={onRequestClose}
                            setIsCardFlipped={setIsCardFlipped}
                        />
                        <DeleteCategory
                            category={category}
                            onRequestClose={onRequestClose}
                            setIsCardFlipped={setIsCardFlipped}
                        />

                    </ReactCardFlip>
                </Container>
            </Dialog.Panel>

        </Dialog >
    )
}