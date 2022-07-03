import { Container } from "./style";
import { NavBarMenu } from "../NavBarMenu";
import Link from "next/link";

export function Header(): JSX.Element {

    return (
        <Container>
            <Link
                href={'/'}
            >
                <a>
                    <h2>FeCardozo</h2>
                </a>
            </Link>
            <NavBarMenu />
        </Container>
    )
}