
import Link from "next/link";
import { Navigation } from "../Navigation";
import { Container } from "./style";

import logoImg from 'images/colored_logo.png'

export function NavBar(): JSX.Element {
    return (
        <Container>
            <div className="sectionHeader">
                <img src="./images/colored_logo.png" alt="logo" />
                <Link
                    href={'/'}
                >
                    <a>
                        <h2>FeCardozo Workshop</h2>
                    </a>
                </Link>
            </div>

            <Navigation />
        </Container>
    )
}