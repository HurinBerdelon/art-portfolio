import { useTranslation } from "next-i18next";
import { useCategory } from "../../../../hooks/useCategory";
import { CategorySchema } from "../../../../schemas/Category";
import { Container } from "./style";
import SyncIcon from '@mui/icons-material/Sync';
import { useState } from "react";

interface DeleteCategoryProps {
    category: CategorySchema
    onRequestClose(): void
    setIsCardFlipped(isCardFlipped: boolean): void
}

export function DeleteCategory({ category, onRequestClose, setIsCardFlipped }: DeleteCategoryProps): JSX.Element {

    const { deleteCategory } = useCategory()
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)

    async function handleDeleteCategory() {
        setIsLoading(true)
        deleteCategory(category.id)

        setIsLoading(false)
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
                    disabled={isLoading}
                >
                    {isLoading ? <SyncIcon className="loading" /> : t('admin:confirm')}
                </button>

            </div>
        </Container>
    )
}