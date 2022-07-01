import Link from "next/link";
import { CategoryLinks } from "./CategoryLinks";
import { MediaLinks } from "./MediaLinks";
import { Container } from "./style";

export function Navigation(): JSX.Element {

    return (
        <Container>
            <Link href='#'>
                <a className='effectLinks' >Home</a>
            </Link>

            <CategoryLinks />

            <Link href='#' >
                <a className='effectLinks'>Contact</a>
            </Link>

            <Link href='#' >
                <a className='effectLinks'>About</a>
            </Link>

            <MediaLinks />

        </Container>
    )
}