import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "./style";

export function ArtOrCategory(): JSX.Element {

    const { asPath } = useRouter()

    return (
        <Container>
            <Link
                href='/admin'
            >
                <a className={asPath === '/admin' ? 'active' : ''}>Arts</a>
            </Link>

            <Link
                href='/admin/categories'
            >
                <a className={asPath === '/admin/categories' ? 'active' : ''}>Categories</a>
            </Link>
        </Container>
    )
}