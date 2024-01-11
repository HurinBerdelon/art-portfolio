import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useCategory } from "../../../hooks/useCategory";
import { Container } from "./style";
import { useRouter } from 'next/router';
import { CreateCategoryModal } from '../CreateCategoryModal';
import { useState } from 'react';
import { CategorySchema } from '../../../schemas/Category';
import { languages } from '../../../config/languages';
import { SettingsCategoryModal } from '../SettingsCategoryModal';
import { useTranslation } from 'next-i18next';

export function ListOfCategories(): JSX.Element {

    const { categories } = useCategory()
    const { locales } = useRouter()
    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false)
    const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = useState(false)
    const [categoryOnUpdate, setCategoryOnUpdate] = useState<CategorySchema>()
    const { t } = useTranslation()

    function capitalize(text: string): string {
        return text
            .split('_')
            .join(' ')
            // string.capitalize() to each word => string-art => String Art
            .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
    }

    return (
        <Container>
            <CreateCategoryModal
                isOpen={isCreateCategoryModalOpen}
                onRequestClose={() => setIsCreateCategoryModalOpen(false)}
            />
            <SettingsCategoryModal
                category={categoryOnUpdate}
                isOpen={isUpdateCategoryModalOpen}
                onRequestClose={() => setIsUpdateCategoryModalOpen(false)}
            />

            <table>
                <thead>
                    <tr>
                        <th className="settings">
                            <button
                                className="buttonAddCategory"
                                onClick={() => setIsCreateCategoryModalOpen(true)}
                            >
                                <AddCircleIcon />
                                <span>{t('admin:addNewCategory')}</span>
                            </button>

                        </th>
                        {locales.map(locale => (
                            <th className='flags' key={locale}>
                                {languages[locale].flag}
                            </th>

                        ))}
                    </tr>
                </thead>
                <tbody>
                    {categories?.map(category => (
                        <tr key={category.id}>
                            <td className="settings">
                                <SettingsIcon onClick={() => {
                                    setCategoryOnUpdate(category)
                                    setIsUpdateCategoryModalOpen(true)
                                }}
                                />
                            </td>
                            <td>{capitalize(category.title)}</td>
                            {locales.map(locale => {
                                const translation = category.Translations.find(item => item.language === locale)
                                if (locale === 'en') return null
                                if (!translation) return <td key={locale}></td>
                                return (
                                    <td key={translation.id}>{capitalize(translation.title)}</td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}