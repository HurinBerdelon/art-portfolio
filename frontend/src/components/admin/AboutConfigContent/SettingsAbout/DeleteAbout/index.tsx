import { useTranslation } from "next-i18next";
import { useTextContent } from "../../../../../hooks/useTextContent";
import { TextContentSchema } from "../../../../../schemas/TextContent";
import { Container } from "./style";

interface DeleteAboutProps {
    textContentOnUpdate: TextContentSchema
    onRequestClose(): void
    setIsCardFlipped(isCardFlipped: boolean): void
}

export function DeleteAbout({ textContentOnUpdate, onRequestClose, setIsCardFlipped }: DeleteAboutProps): JSX.Element {

    const { deleteTextContent } = useTextContent()
    const { t } = useTranslation()

    function handleDeleteAbout() {
        deleteTextContent(textContentOnUpdate.id)
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
                >
                    {t('admin:confirm')}
                </button>

            </div>
        </Container>
    )
}