import { Container } from "./style";
import { NavBarMenu } from "../NavBarMenu";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";

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
            <div className="buttons">
                <ThemeSwitcher />
                <NavBarMenu />
            </div>
        </Container>
    )
}