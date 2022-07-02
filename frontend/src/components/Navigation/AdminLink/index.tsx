import { signIn, useSession } from "next-auth/react";
import KeyIcon from '@mui/icons-material/Key';
import { Container } from "./style";
import { ActiveLink } from "../ActiveLink";

export function AdminLink(): JSX.Element {

    const { data: session } = useSession()

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

            <p>by Fernando Cardozo</p>
        </Container>
    )
}