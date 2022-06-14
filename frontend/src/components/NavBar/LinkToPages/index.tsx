import { useEffect, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useCategory } from "../../../hooks/useCategory";
import { ActiveLink } from "../ActiveLink";
import { Container } from "./style";
import { useRouter } from "next/router";
interface pagesProps {
    title: string
    href: string
}

export function LinkToPages(): JSX.Element {

    const { categories } = useCategory()
    const router = useRouter()
    const [isShowingCategories, setIsShowingCategories] = useState(false)
    const [categoryPages, setCategoryPages] = useState<pagesProps[]>()
    const [pages, setPages] = useState([
        { title: 'About', href: '#' },
        { title: 'Contact', href: '#' },
        { title: 'Admin', href: '/admin' }
    ])

    useEffect(() => {
        if (categories) {
            setCategoryPages(categories.map(category => {
                return {
                    title: category.title
                        .split('_')
                        .join(' ')
                        // string.capitalize() to each word => string-art => String Art
                        .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
                    href: `/${category.title}`
                }
            }))
        }

    }, [categories])

    useEffect(() => {
        if (categoryPages) {
            const isCategoryPath = categoryPages.find(category => category.href === router.asPath)

            if (isCategoryPath) {
                setIsShowingCategories(true)
            }
        }
    }, [router, categoryPages])

    function toggleShowCategories() {
        setIsShowingCategories(!isShowingCategories)
    }

    return (
        <Container>
            <ActiveLink
                href={'/'}
                activeClassName="active"
            >
                <a>{'Home'}</a>
            </ActiveLink>

            <p
                className="categoryButton"
                onClick={toggleShowCategories}
            >
                {isShowingCategories
                    ? (<>
                        <ArrowDropDownIcon />
                        Categories
                    </>)
                    : (<>
                        <ArrowRightIcon />
                        Categories
                    </>)
                }
            </p>

            {isShowingCategories
                ? (<span className='categoryPages'>
                    {categoryPages.map((page) => (
                        <ActiveLink
                            key={page.title}
                            href={page.href}
                            activeClassName="active"
                        >
                            <a>{page.title}</a>
                        </ActiveLink>
                    ))}
                </span>)
                : (<>
                </>)
            }

            {pages.map((page) => (
                <ActiveLink
                    key={page.title}
                    href={page.href}
                    activeClassName="active"
                >
                    <a>{page.title}</a>
                </ActiveLink>
            ))}
        </Container>
    )
}