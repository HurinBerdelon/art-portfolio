import { Container } from "./style";

export function LinkToPages(): JSX.Element {
    return (
        <Container>
            <li
            // className={props.currentPage === 'home' ? 'active' : ''}
            // onClick={() => props.setCurrentPage('home')}
            >
                <a href="/">Home</a>
            </li>
            <li
            // className={props.currentPage === 'illustration' ? 'active' : ''}
            // onClick={() => props.setCurrentPage('illustration')}
            >
                Illustration
            </li>
            <li
            // className={props.currentPage === 'craftsmanship' ? 'active' : ''}
            // onClick={() => props.setCurrentPage('craftsmanship')}
            >
                Craftsmanship
            </li>
            <li
            // className={props.currentPage === 'about' ? 'active' : ''}
            // onClick={() => props.setCurrentPage('about')}
            >
                About
            </li>
            <li
            // className={props.currentPage === 'contact' ? 'active' : ''}
            // onClick={() => props.setCurrentPage('contact')}
            >
                Contact
            </li>

            <li
            // className={props.currentPage === 'admin' ? 'active' : ''}
            // onClick={() => props.setCurrentPage('admin')}
            >
                <a href="/admin"> Admin </a>
            </li>
        </Container>
    )
}