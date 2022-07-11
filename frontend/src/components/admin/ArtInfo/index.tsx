import { Popover } from "@headlessui/react";
import dayjs from "dayjs";
import InfoIcon from '@mui/icons-material/Info';
import { ArtSchema } from "../../../schemas/Art";
import { Container } from "./style";

interface ArtInfoProps {
    art: ArtSchema
}

export function ArtInfo({ art }: ArtInfoProps): JSX.Element {
    return (
        <Container>
            <Popover>
                <Popover.Button>
                    <InfoIcon />
                </Popover.Button>
                <Popover.Panel className='content'>
                    <h2>Title: <span>{art.title}</span></h2>
                    <p>Unique Code: <span>{art.uniqueCode}</span></p>
                    <p>Category: <span>{art.categoryTitle}</span></p>
                    <p>Dimension: <span>{art.dimension}</span></p>
                    <p>Description: <span>{art.description}</span></p>
                    <p>Production Date: <span>{dayjs(art.productionDate).format('MMMM [of] YYYY')}</span></p>
                </Popover.Panel>
            </Popover>
        </Container>
    )
}