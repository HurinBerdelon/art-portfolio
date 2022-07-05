import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useCategory } from "../../../hooks/useCategory";
import { Container } from "./style";
import { useRouter } from 'next/router';
import { CreateCategoryModal } from '../CreateCategoryModal';
import { useState } from 'react';
import { UpdateCategoryModal } from '../UpdateCategoryModal';
import { CategorySchema } from '../../../schemas/Category';
import { languages } from '../../../config/languages';

export function ListOfCategories(): JSX.Element {

    const { categories } = useCategory()
    const { locales } = useRouter()
    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false)
    const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = useState(false)
    const [categoryOnUpdate, setCategoryOnUpdate] = useState<CategorySchema>()

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
            <UpdateCategoryModal
                category={categoryOnUpdate}
                isOpen={isUpdateCategoryModalOpen}
                onRequestClose={() => setIsUpdateCategoryModalOpen(false)}
            />

            <table>
                <thead>
                    <tr>
                        <th className="settings">
                            <AddCircleIcon
                                onClick={() => setIsCreateCategoryModalOpen(true)}
                            />
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
                            <td>{category.title}</td>
                            {locales.map(locale => {
                                const translation = category.Translations.find(item => item.language === locale)
                                if (locale === 'en') return null
                                if (!translation) return <td key={locale}></td>
                                return (
                                    <td key={translation.id}>{translation.title}</td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}