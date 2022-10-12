import { Popover } from "@headlessui/react";
import dayjs from "dayjs";
import InfoIcon from '@mui/icons-material/Info';
import { ArtSchema } from "../../../schemas/Art";
import { Container } from "./style";
import { useTranslation } from "next-i18next";

interface ArtInfoProps {
    art: ArtSchema
}

export function ArtInfo({ art }: ArtInfoProps): JSX.Element {

    const { t } = useTranslation()

    return (
        <Container>
            <Popover>
                <Popover.Button>
                    <InfoIcon />
                </Popover.Button>
                <Popover.Panel className='content'>
                    <h2>
                        {t('admin:title')}:
                        <span> {art.title}</span>
                    </h2>
                    <p>
                        {t('admin:uniqueCode')}:
                        <span> {art.uniqueCode}</span>
                    </p>
                    <p>
                        {t('admin:categoryTitle')}:
                        <span> {art.categoryTitle}</span>
                    </p>
                    <p>
                        {t('admin:dimension')}:
                        <span> {art.dimension}</span>
                    </p>
                    <p>
                        {t('admin:description')}:
                        <span> {art.description}</span>
                    </p>
                    <p>
                        {t('admin:productionDate')}:
                        <span> {dayjs(art.productionDate).format('MMMM [of] YYYY')}</span>
                    </p>
                </Popover.Panel>
            </Popover>
        </Container>
    )
}