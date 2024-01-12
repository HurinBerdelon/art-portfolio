import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useTextContent } from "../../../../../hooks/useTextContent";
import { TextContentSchema } from "../../../../../schemas/TextContent";
import { Container } from "./style";
import SyncIcon from '@mui/icons-material/Sync';

interface DeleteAboutProps {
    textContentOnUpdate: TextContentSchema
    onRequestClose(): void
    setIsCardFlipped(isCardFlipped: boolean): void
}

export function DeleteAbout({ textContentOnUpdate, onRequestClose, setIsCardFlipped }: DeleteAboutProps): JSX.Element {

    const { deleteTextContent } = useTextContent()
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)

    function handleDeleteAbout() {
        setIsLoading(true)
        deleteTextContent(textContentOnUpdate.id)
        setIsLoading(false)
        onRequestClose()
    }

    return (
        <Container>

            <h2>{t('admin:deleteAboutContent')}</h2>
            <p>
                {t('admin:deleteAboutConfirmation')}
            </p>
            <div className="buttons">
                <button
                    className="cancelButton"
                    onClick={() => setIsCardFlipped(false)}
                >
                    {t('admin:cancel')}
                </button>
                <button
                    className="confirmButton"
                    onClick={handleDeleteAbout}
                    disabled={isLoading}
                >
                    {isLoading ? <SyncIcon className="loading" /> : t('admin:confirm')}
                </button>

            </div>
        </Container>
    )
}