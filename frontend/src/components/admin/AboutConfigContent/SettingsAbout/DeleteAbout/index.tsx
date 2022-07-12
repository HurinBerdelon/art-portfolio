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

    function handleDeleteAbout() {
        deleteTextContent(textContentOnUpdate.id)
        onRequestClose()
    }

    return (
        <Container>

            <h2>Delete Category</h2>
            <p>
                Are you sure you want to delete
                this content?
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
                    onClick={handleDeleteAbout}
                >
                    Confirm
                </button>

            </div>
        </Container>
    )
}