import Link from 'next/link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { ContactForm } from "./ContactForm";
import { Container } from "./style";
import { useTranslation } from 'next-i18next';

export function ContactContent(): JSX.Element {

    const { t } = useTranslation()

    return (
        <Container>
            <div className="imageContainer">
                <img src="/images/contact-us.png" alt="contact us" />
            </div>
            <h1>{t('common:getInTouch')}</h1>
            {/* <ContactForm /> */}

            <div className="contactInfos">
                <div className="contactCard">
                    <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>
                        <a target='_blank'>
                            <EmailIcon />
                        </a>
                    </Link>
                    fhpcardozo@gmail.com
                </div>
                <div className="contactCard">
                    <WhatsAppIcon />
                    +55 (24) 98844-1793
                </div>

                <div className="contactCard">
                    <Link
                        href={process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM}
                    >
                        <a target='_blank'>
                            <InstagramIcon />
                        </a>
                    </Link>
                    @fecardozo_workshop
                </div>

                <div className="contactCard">
                    <Link
                        href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN}
                    >
                        <a target='_blank'>
                            <LinkedInIcon />
                        </a>
                    </Link>
                    Fernando Henrique P. Cardozo
                </div>
            </div>
        </Container>
    )
}