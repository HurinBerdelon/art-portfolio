import { Popover } from "@headlessui/react";
import InfoIcon from '@mui/icons-material/Info';
import { Container } from "./style";

interface AboutTipsProps {
    category: string
}

export function AboutTips({ category }: AboutTipsProps): JSX.Element {
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
                                Good about pages contain information of who you are and your history,
                                related to the context of your portfolio.
                            </p>
                        )
                        : (
                            <p>
                                On the content of your business it is a good idea t o talk about its history,
                                how it came to life and what products or services you are offering, highlighting its benefits,
                                as long as talk about your mission with this business.
                            </p>
                        )
                    }
                </Popover.Panel>
            </Popover>
        </Container>
    )
}