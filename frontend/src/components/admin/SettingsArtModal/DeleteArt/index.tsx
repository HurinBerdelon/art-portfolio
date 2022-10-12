import { gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import { useArts } from "../../../../hooks/useArts";
import { ArtSchema } from "../../../../schemas/Art";
import { apolloClient } from "../../../../services/apolloClient";
import { revalidateSSG } from "../../../../services/revalidate";
import { toastSuccess, toastWarn } from "../../../../services/toastProvider";
import { Container } from "./style";

interface DeleteArtProps {
    art: ArtSchema
    onRequestClose(): void
    setIsCardFlipped(isCardFlipped: boolean): void
}

export function DeleteArt({ art, onRequestClose, setIsCardFlipped }: DeleteArtProps): JSX.Element {

    const { arts, setArts } = useArts()
    const { t } = useTranslation()

    function handleDeleteArt() {
        apolloClient.query({
            query: gql`
                query DeleteArt{
                    deleteArt(id: "${art.id}") 
                }
            `
        }).then(() => toastSuccess(`Art ${art.title} was deleted!`))
            .catch(error => toastWarn(`Unhandled error with message: ${error.message}! Please, contact the developer`))

        const tempArts = [...arts]
        tempArts.splice(arts.indexOf(art), 1)
        setArts(tempArts)

        revalidateSSG({ path: art.categoryTitle })
        revalidateSSG({ path: '' })

        onRequestClose()
    }

    return (
        <Container>
            <h2>{t('admin:deleteArt')}</h2>
            <p>
                {t('admin:deleteArtConfirmation')}
                <span> {`${t('admin:art')}: ${art.title} ?`}</span>
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
                    onClick={handleDeleteArt}
                >
                    {t('admin:confirm')}
                </button>

            </div>
        </Container>
    )
}