import { Container } from "./style";
import { Menu } from "@headlessui/react";
import MenuIcon from '@mui/icons-material/Menu';
import { Navigation } from "../Navigation";

export function NavBarMenu(): JSX.Element {

    return (
        <Container>
            <Menu>
                {({ open }) => (
                    <>
                        <div className={open && 'contentOverlay'}></div>
                        <Menu.Button>
                            <MenuIcon />
                        </Menu.Button>
                        <Menu.Items className='menuContent'>
                            <Menu.Item>
                                <Navigation />
                            </Menu.Item>
                        </Menu.Items>
                    </>
                )}
            </Menu>
        </Container>
    )
}