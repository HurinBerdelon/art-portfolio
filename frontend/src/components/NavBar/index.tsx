import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Container } from "./style";

interface NavBarProps {
    // currentPage: string,
    // setCurrentPage(currentPage: string): void
}

export function NavBar(props: NavBarProps): JSX.Element {
    return (
        <Container>
            <h1>HurinBerdelon</h1>
            <ul className='menu'>
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
            </ul>

            <div className='media-links'>

                <Tooltip title='Open Instagram in new Tab'>
                    <a target='_blank' href="https://www.instagram.com/fecardozo_workshop/">
                        <InstagramIcon />
                    </a>
                </Tooltip>

                <Tooltip title='Open LinkedIn in new Tab'>
                    <a target='_blank' href="https://www.linkedin.com/in/fernando-henrique-p-cardozo/">
                        <LinkedInIcon />
                    </a>
                </Tooltip>

                <Tooltip title='Send me an Email'>
                    <a href="mailto:fernando_cardozo@poli.ufrj.br" target='_blank'>
                        <EmailIcon />
                    </a>
                </Tooltip>
            </div>
        </Container>
    )
}