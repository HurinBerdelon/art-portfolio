import { Tooltip } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { Container } from "./style";
import { useTranslation } from "next-i18next";
import CopyToClipboard from "react-copy-to-clipboard";
import { toastSuccess } from "../../../services/toastProvider";

export function SocialMediaLinks(): JSX.Element {

    const { t } = useTranslation()

    function handleCopyToClipboard() {
        toastSuccess(t('common:emailCopied'))
    }

    return (
        <Container>
            <Tooltip title={t('common:openInstagram')}>
                <a target='_blank' href={process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM}>
                    <InstagramIcon />
                </a>
            </Tooltip>

            <Tooltip title={t('common:openLinkedin')}>
                <a target='_blank' href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN}>
                    <LinkedInIcon />
                </a>
            </Tooltip>

            <Tooltip title={t('common:sendMail')}>
                <>
                    <a className="sendMailMobile" href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} target='_blank'>
                        <EmailIcon />
                    </a>
                    <CopyToClipboard text={process.env.NEXT_PUBLIC_CONTACT_EMAIL}>
                        <button className="sendMailDesktop" onClick={handleCopyToClipboard}>
                            <EmailIcon />
                        </button>
                    </CopyToClipboard>
                </>
            </Tooltip>
        </Container>
    )
}