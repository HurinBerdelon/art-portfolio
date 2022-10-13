import { Container } from "./style";
import { NavBarMenu } from "../NavBarMenu";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { IdiomSwitcher } from "../IdiomSwitcher";

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
                <IdiomSwitcher />
                <NavBarMenu />
            </div>
        </Container>
    )
}