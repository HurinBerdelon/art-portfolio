import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "./style";

export function AdminLinks(): JSX.Element {

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

            <Link
                href='/admin/configs/about'
            >
                <a className={asPath === '/admin/configs/about' ? 'active' : ''}>About</a>
            </Link>
        </Container>
    )
}