import { useTranslation } from "next-i18next";
import { ActiveLink } from "./ActiveLink";
import { AdminLink } from "./AdminLink";
import { CategoryLinks } from "./CategoryLinks";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { Container } from "./style";

export function Navigation(): JSX.Element {

    const { t } = useTranslation()

    return (
        <Container>
            <div className="links">
                <ActiveLink href='/' activeClassName="active" className='effectLinks'>
                    <a>{t('common:home')}</a>
                </ActiveLink>

                <CategoryLinks />

                <ActiveLink href='/contact' activeClassName="active" className='effectLinks'>
                    <a>{t('common:contact')}</a>
                </ActiveLink>

                <ActiveLink href='/about' activeClassName="active" className='effectLinks'>
                    <a>{t('common:about')}</a>
                </ActiveLink>
            </div>

            <SocialMediaLinks />

            <AdminLink />

        </Container>
    )
}