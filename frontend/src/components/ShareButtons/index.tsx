import { FacebookShareButton, WhatsappShareButton } from "react-share";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Container } from "./style";
import CopyToClipboard from "react-copy-to-clipboard";
import { Popover } from "@headlessui/react";
import { toastSuccess } from "../../services/toastProvider";
import { useTranslation } from "next-i18next";

interface ShareButtonProps {
    currentPictureId: string
}

export function ShareButton({ currentPictureId }: ShareButtonProps): JSX.Element {

    const { t } = useTranslation()

    function handleCopyToClipboard() {
        toastSuccess(t('common:copyToClipboard'))
    }

    return (
        <Container>
            <Popover>
                <Popover.Button className='shareMediaButton'>
                    <h3>{t('common:share')}</h3>
                    <ShareIcon />
                </Popover.Button>
                <Popover.Panel>
                    <div className="dropdown-content">

                        <div className="socialMediaContent">

                            <FacebookShareButton url={`${process.env.NEXT_PUBLIC_APP_ENDPOINT}/image/${currentPictureId}`}>
                                <FacebookIcon />
                            </FacebookShareButton>

                            <WhatsappShareButton url={`${process.env.NEXT_PUBLIC_APP_ENDPOINT}/image/${currentPictureId}`}>
                                <WhatsAppIcon />
                            </WhatsappShareButton>
                        </div>

                        <CopyToClipboard text={`${process.env.NEXT_PUBLIC_APP_ENDPOINT}/image/${currentPictureId}`}>
                            <button className="copyPaste" onClick={handleCopyToClipboard} >
                                <ContentCopyIcon />
                                <h4>{t('common:copyLink')}</h4>
                            </button>
                        </CopyToClipboard>

                    </div>
                </Popover.Panel>
            </Popover>

        </Container>
    )
}