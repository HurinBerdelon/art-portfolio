import { Tooltip } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Container } from "./style";

export function MediaLinks(): JSX.Element {

    return (
        <Container>
            <Tooltip title='Open Instagram in new Tab'>
                <a target='_blank' href={process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM}>
                    <InstagramIcon />
                </a>
            </Tooltip>

            <Tooltip title='Open LinkedIn in new Tab'>
                <a target='_blank' href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN}>
                    <LinkedInIcon />
                </a>
            </Tooltip>

            <Tooltip title='Send me an Email'>
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} target='_blank'>
                    <EmailIcon />
                </a>
            </Tooltip>
        </Container>
    )
}