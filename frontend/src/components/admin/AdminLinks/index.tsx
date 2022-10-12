import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "./style";

export function AdminLinks(): JSX.Element {

    const { asPath } = useRouter()
    const { t } = useTranslation()

    return (
        <Container>
            <Link
                href='/admin'
            >
                <a className={asPath === '/admin' ? 'active' : ''}>{t('admin:arts')}</a>
            </Link>

            <Link
                href='/admin/categories'
            >
                <a className={asPath === '/admin/categories' ? 'active' : ''}>{t('common:categories')}</a>
            </Link>

            <Link
                href='/admin/configs/about'
            >
                <a className={asPath === '/admin/configs/about' ? 'active' : ''}>{t('common:about')}</a>
            </Link>
        </Container>
    )
}