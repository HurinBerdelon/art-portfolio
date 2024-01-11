import { Popover } from "@headlessui/react";
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from "next-i18next";
import { Container } from "./style";

interface AboutTipsProps {
    category: string
}

export function AboutTips({ category }: AboutTipsProps): JSX.Element {

    const { t } = useTranslation()

    return (
        <Container>
            <Popover>
                <Popover.Button>
                    <InfoIcon />
                </Popover.Button>
                <Popover.Panel className='content'>
                    {category === 'aboutYourself'
                        ? (
                            <p>
                                {t('admin:aboutYourselfInfo')}
                            </p>
                        )
                        : (
                            <p>
                                {t('admin:aboutBusinessInfo')}
                            </p>
                        )
                    }
                </Popover.Panel>
            </Popover>
        </Container>
    )
}