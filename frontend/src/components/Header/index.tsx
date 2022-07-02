import { Container } from "./style";
import MenuIcon from '@mui/icons-material/Menu';
import { NavBarMenu } from "../NavBarMenu";

export function Header(): JSX.Element {

    return (
        <Container>
            <h2>FeCardozo</h2>
            <NavBarMenu />
        </Container>
    )
}