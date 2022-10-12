import { Popover } from '@headlessui/react';
import LanguageIcon from '@mui/icons-material/Language';
import { Container } from './style';
import { i18n } from '../../../next-i18next.config'
import { languages } from '../../config/languages';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function IdiomSwitcher(): JSX.Element {

    const router = useRouter()

    return (
        <Container>
            <Popover>
                <Popover.Button>
                    <LanguageIcon />
                </Popover.Button>
                <Popover.Panel>
                    <ul className="availableIdioms">
                        {i18n.locales.map(locale => (
                            <li key={locale}>
                                <Link href={router.asPath} locale={locale}>
                                    <a>
                                        <span>{languages[locale].flag}</span>
                                        <span>{languages[locale].label}</span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Popover.Panel>
            </Popover>
        </Container>
    )
}