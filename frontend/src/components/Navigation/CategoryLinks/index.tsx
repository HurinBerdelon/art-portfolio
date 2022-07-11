import { useEffect, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Container } from "./style";
import { ActiveLink } from "../ActiveLink";
import { useCategory } from "../../../hooks/useCategory";
import { useRouter } from "next/router";


export function CategoryLinks(): JSX.Element {

    const [isShowingCategories, setIsShowingCategories] = useState(false)
    const { categories } = useCategory()
    const { asPath } = useRouter()

    useEffect(() => {
        const isAtCategoryPage = categories.find(category => category.title === asPath.split('/')[1])
        if (isAtCategoryPage) setIsShowingCategories(true)
    }, [])

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
                Categories
            </p>

            {isShowingCategories
                ? (
                    <span
                        className="categoriesLink"
                    >
                        {categories.map(category => (
                            <ActiveLink
                                key={category.id}
                                href={`/${category.title}`}
                                activeClassName="active"
                                className='effectLinks'
                            >
                                <a>{capitalize(category.title)}</a>
                            </ActiveLink>
                        ))}

                    </span>
                )
                : null
            }
        </Container>
    )
}