import dayjs from "dayjs";
import { ArtSchema } from "../../../schemas/Art";
import { ShareButton } from "../../ShareButtons";
import { Container } from "./style";

interface InfoContainerProps {
    currentArt: ArtSchema
}

export function InfoContainer({ currentArt }: InfoContainerProps): JSX.Element {

    return (
        <Container>
            <div className="infos">

                <h2>{currentArt.title}</h2>
                <p className='dateInfo'>{dayjs(currentArt.productionDate).format('MMMM [of] YYYY')}</p>
                <p className="dimensionInfo">{currentArt.dimension}</p>
                <p className="categoryInfo">{currentArt.categoryTitle}</p>
                <p className='descriptionInfo'>{currentArt.description}</p>
            </div>

            <div className="shareMedia">
                <ShareButton currentPictureId={currentArt.id} />
            </div>
        </Container>
    )
}