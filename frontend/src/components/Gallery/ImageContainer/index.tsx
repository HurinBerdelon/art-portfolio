import { Tooltip } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Container } from "./style";
import { ArtSchema } from "../../../schemas/Art";

interface ImageContainerProps {
    artIndex: number
    currentArt: ArtSchema
    shouldRenderButtons?: boolean
    handlePreviousPicture(index: number): void
    handleNextPicture(index: number): void
}

export function ImageContainer({
    artIndex,
    currentArt,
    shouldRenderButtons = true,
    handleNextPicture,
    handlePreviousPicture
}: ImageContainerProps): JSX.Element {

    return (
        <Container>
            <img src={currentArt.image} alt={currentArt.title} />
            {shouldRenderButtons
                ? (
                    <>
                        <button
                            className="buttonPrevious"
                            onClick={() => handlePreviousPicture(artIndex - 1)}
                        >
                            <Tooltip title='Previous Picture'>
                                <ArrowBackIosIcon />
                            </Tooltip>
                        </button>
                        <button
                            className="buttonNext"
                            onClick={() => handleNextPicture(artIndex + 1)}
                        >
                            <Tooltip title='Next Picture'>
                                <ArrowForwardIosIcon />
                            </Tooltip>
                        </button>
                    </>
                )
                : null
            }
        </Container>
    )
}