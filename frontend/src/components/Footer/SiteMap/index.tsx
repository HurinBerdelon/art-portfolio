import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useCategory } from "../../../hooks/useCategory";
import { Container } from "./style";

export function SiteMap(): JSX.Element {

    const { categories } = useCategory()
    const { t } = useTranslation()

    return (
        <Container>
            <div className="imgContainer">
                <Link href="/">
                    <a>
                        <img src="/images/colored_logo.png" alt="logo" className="top" />
                        <img src="/images/logo.png" alt="logo" className="bot" />
                    </a>
                </Link>
            </div>
            <div>
                <h4>{t('common:categories')}</h4>
                <ul>
                    {categories?.map(category => (
                        <li key={category.id} className="categoryLinks">
                            <Link href={`/${category.title}`}>
                                <a>{category.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul className="otherLinks">
                    <li>
                        <Link href="/about">
                            <a>{t('common:about')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <a>{t('common:contact')}</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </Container>
    )
}