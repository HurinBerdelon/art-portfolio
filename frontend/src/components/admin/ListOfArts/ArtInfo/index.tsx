import dayjs from "dayjs";
import { ArtSchema } from "../../../../schemas/Art";
import { Container } from "./style";

interface ArtInfoProps {
    art: ArtSchema
}

export function ArtInfo({ art }: ArtInfoProps): JSX.Element {
    return (
        <Container>
            <h2>Title: {art.title}</h2>
            <p>Unique Code: {art.uniqueCode}</p>
            <p>Category: {art.categoryTitle}</p>
            <p>Dimension: {art.dimension}</p>
            <p>Description: {art.description}</p>
            <p>Production Date: {dayjs(art.productionDate).format('MMMM [of] YYYY')}</p>
        </Container>
    )
}