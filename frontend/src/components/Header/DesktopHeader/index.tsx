import { IdiomSwitcher } from "../../IdiomSwitcher";
import { ThemeSwitcher } from "../../ThemeSwitcher";
import { Container } from "./style";

export function DesktopHeader() {

    return (
        <Container>
            <ThemeSwitcher />
            <IdiomSwitcher />
        </Container>
    )
}