import { gql } from "@apollo/client";
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

            <h2>Delete Category</h2>
            <p>
                Are you sure you want to delete
                <span> {`category: ${art.title} ?`}</span>
            </p>
            <div className="buttons">
                <button
                    className="cancelButton"
                    onClick={() => setIsCardFlipped(false)}
                >
                    Cancel
                </button>
                <button
                    className="confirmButton"
                    onClick={handleDeleteArt}
                >
                    Confirm
                </button>

            </div>
        </Container>
    )
}