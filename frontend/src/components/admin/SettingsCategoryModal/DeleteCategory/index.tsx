import { useCategory } from "../../../../hooks/useCategory";
import { CategorySchema } from "../../../../schemas/Category";
import { Container } from "./style";

interface DeleteCategoryProps {
    category: CategorySchema
    onRequestClose(): void
    setIsCardFlipped(isCardFlipped: boolean): void
}

export function DeleteCategory({ category, onRequestClose, setIsCardFlipped }: DeleteCategoryProps): JSX.Element {

    const { deleteCategory } = useCategory()

    function handleDeleteCategory() {
        deleteCategory(category.id)

        onRequestClose()
    }

    return (
        <Container>

            <h2>Delete Category</h2>
            <p>
                Are you sure you want to delete
                <span> {`category: ${category.title} ?`}</span>
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
                    onClick={handleDeleteCategory}
                >
                    Confirm
                </button>

            </div>
        </Container>
    )
}