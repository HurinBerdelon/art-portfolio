import { FacebookShareButton, WhatsappShareButton } from "react-share";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { RiShareForwardFill } from 'react-icons/ri'
import { Container } from "./style";
import CopyToClipboard from "react-copy-to-clipboard";

interface ShareButtonProps {
    currentPictureId: string
}

export function ShareButton({ currentPictureId }: ShareButtonProps): JSX.Element {

    return (
        <Container>
            <div className="dropdown-content">

                <div className="socialMediaContent">

                    <FacebookShareButton url={`${process.env.NEXT_PUBLIC_APP_ENDPOINT}image/${currentPictureId}`}>
                        <FacebookIcon />
                    </FacebookShareButton>

                    <WhatsappShareButton url={`${process.env.NEXT_PUBLIC_APP_ENDPOINT}image/${currentPictureId}`}>
                        <WhatsAppIcon />
                    </WhatsappShareButton>
                </div>

                <CopyToClipboard text={`${process.env.NEXT_PUBLIC_APP_ENDPOINT}image/${currentPictureId}`}>
                    <button className="copyPaste">
                        <ContentCopyIcon />
                        <h4>Copy Link</h4>
                    </button>
                </CopyToClipboard>


            </div>
            <button className="dropbtn">
                <RiShareForwardFill />
                <h3>Share</h3>
            </button>

        </Container>
    )
}