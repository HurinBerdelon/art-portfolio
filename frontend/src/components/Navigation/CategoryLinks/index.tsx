import { useEffect, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Container } from "./style";
import { ActiveLink } from "../ActiveLink";
import { useCategory } from "../../../hooks/useCategory";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { CategorySchema, TranslationSchema } from "../../../schemas/Category";

interface CategoriesTranslatedProps {
    id: string
    title: string
    translation: string
}

export function CategoryLinks(): JSX.Element {

    const [isShowingCategories, setIsShowingCategories] = useState(false)
    const { categories } = useCategory()
    const [categoriesTranslated, setCategoriesTranslated] = useState<CategoriesTranslatedProps[]>()
    const { asPath } = useRouter()
    const { t } = useTranslation()
    const { locale } = useRouter()

    useEffect(() => {
        setCategoriesTranslated(
            categories?.map(category => {
                return {
                    id: category.id,
                    title: category.title,
                    translation: category.Translations.find(translation => translation.language === locale)?.title || category.title,
                }
            })
        )
    }, [categories, locale])

    useEffect(() => {
        const isAtCategoryPage = categories?.find(category => category.title === asPath.split('/')[1])
        if (isAtCategoryPage) setIsShowingCategories(true)
    }, [asPath, categories])

    function toggleShowCategories() {
        setIsShowingCategories(!isShowingCategories)
    }

    function capitalize(text: string): string {
        return text
            .split('_')
            .join(' ')
            // string.capitalize() to each word => string-art => String Art
            .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
    }

    return (
        <Container>
            <p
                className="categoriesButton"
                onClick={toggleShowCategories}
            >
                {isShowingCategories
                    ? <ArrowDropDownIcon />
                    : <ArrowRightIcon />
                }
                {t('common:categories')}
            </p>

            {isShowingCategories
                ? (
                    <span
                        className="categoriesLink"
                    >
                        {categoriesTranslated?.map(category => (
                            <ActiveLink
                                key={category.id}
                                href={`/${category.title}`}
                                activeClassName="active"
                                className='effectLinks'
                            >
                                <a>{capitalize(category.translation)}</a>
                            </ActiveLink>
                        ))}

                    </span>
                )
                : null
            }
        </Container>
    )
}