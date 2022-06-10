import { availableCategories } from "../../../config/availableCategories";
import { ActiveLink } from "../ActiveLink";
import { Container } from "./style";

const CATEGORY_PAGES = availableCategories.map(category => {
    return {
        title: category
            .replace('-', ' ')
            // string.capitalize() to each word => string-art => String Art
            .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
        href: `/${category}`
    }
})

const PAGES = [
    { title: 'Home', href: '/' },
    ...CATEGORY_PAGES,
    { title: 'About', href: '#' },
    { title: 'Contact', href: '#' },
    { title: 'Admin', href: '/admin' },
]

export function LinkToPages(): JSX.Element {
    return (
        <Container>
            {PAGES.map((page) => (
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