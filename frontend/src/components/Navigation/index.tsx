import { ActiveLink } from "./ActiveLink";
import { AdminLink } from "./AdminLink";
import { CategoryLinks } from "./CategoryLinks";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { Container } from "./style";

export function Navigation(): JSX.Element {

    return (
        <Container>
            <div className="links">
                <ActiveLink href='/' activeClassName="active" className='effectLinks'>
                    <a >Home</a>
                </ActiveLink>

                <CategoryLinks />

                <ActiveLink href='/contact' activeClassName="active" className='effectLinks'>
                    <a>Contact</a>
                </ActiveLink>

                <ActiveLink href='/about' activeClassName="active" className='effectLinks'>
                    <a>About</a>
                </ActiveLink>
            </div>

            <SocialMediaLinks />

            <AdminLink />

        </Container>
    )
}