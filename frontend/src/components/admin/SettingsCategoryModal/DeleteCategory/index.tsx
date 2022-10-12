import { useTranslation } from "next-i18next";
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
    const { t } = useTranslation()

    function handleDeleteCategory() {
        deleteCategory(category.id)

        onRequestClose()
    }

    return (
        <Container>

            <h2>{t('admin:deleteCategory')}</h2>
            <p>
                {t('admin:deleteCategoryConfirmation')}
                <span> {`${t('admin:category')}: ${category.title} ?`}</span>
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
                    onClick={handleDeleteCategory}
                >
                    {t('admin:confirm')}
                </button>

            </div>
        </Container>
    )
}