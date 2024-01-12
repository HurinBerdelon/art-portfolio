import { signIn, useSession } from "next-auth/react";
import KeyIcon from '@mui/icons-material/Key';
import { Container } from "./style";
import { ActiveLink } from "../ActiveLink";
import { useTranslation } from "next-i18next";

export function AdminLink(): JSX.Element {

    const { data: session } = useSession()
    const { t } = useTranslation()

    return (
        <Container>
            {session
                ? <ActiveLink
                    href="/admin"
                    activeClassName="active"
                >
                    <KeyIcon />
                </ActiveLink>
                : <KeyIcon
                    onClick={() => signIn(null, { callbackUrl: '/admin' })}
                />
            }

            <p>{t('common:by')} Fernando Cardozo</p>
        </Container>
    )
}