import { ArtSchema } from "../../../schemas/Art";
import { ShareButton } from "../../ShareButtons";
import { Container } from "./style";
import { useRouter } from "next/router";
import { dateFormatter } from "../../../utils/dateFormatter";
import { useCategory } from "../../../hooks/useCategory";

interface InfoContainerProps {
    currentArt: ArtSchema
}

export function InfoContainer({ currentArt }: InfoContainerProps): JSX.Element {

    const { locale } = useRouter()
    const { categories } = useCategory()

    return (
        <Container>
            <div className="infos">
                <h2>{currentArt.title}</h2>
                <p className='dateInfo'>
                    {dateFormatter(currentArt.productionDate, locale)}
                </p>
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