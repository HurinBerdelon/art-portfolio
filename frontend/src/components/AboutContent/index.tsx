import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ReactHtmlParser from 'react-html-parser'
import { TextContentSchema } from "../../schemas/TextContent";
import { Container } from "./style";

interface AboutContentProps {
    aboutContent: TextContentSchema[]
}

export function AboutContent({ aboutContent }: AboutContentProps): JSX.Element {

    const { locale } = useRouter()
    const { t } = useTranslation()

    const aboutYourself = {
        image: aboutContent.find(item => item.type === 'aboutYourself' && item.idiom === locale)?.imageUrl,
        text: aboutContent.find(item => item.type === 'aboutYourself' && item.idiom === locale)?.text
    }

    const aboutBusiness = {
        image: aboutContent.find(item => item.type === 'aboutBusiness' && item.idiom === locale)?.imageUrl,
        text: aboutContent.find(item => item.type === 'aboutBusiness' && item.idiom === locale)?.text
    }

    return (
        <Container>
            <h1>{t('common:about')}</h1>

            {aboutYourself.text
                ? (<div className="aboutYourselfContent">
                    <div className="imageContainer">
                        <img src={aboutYourself.image} alt='About Yourself' />
                    </div>

                    <div className="content">
                        {ReactHtmlParser(aboutYourself.text)}
                    </div>
                </div>)
                : (
                    <p>{t('common:underConstruction')}</p>
                )
            }

            {aboutBusiness.text
                ? (<div className="aboutBusinessContent">
                    <div className="imageContainer">
                        <img src={aboutBusiness.image} alt="About Products or Services" />
                    </div>

                    <div className="content">
                        {ReactHtmlParser(aboutBusiness.text)}
                    </div>
                </div>)
                : (
                    <p>{t('common:underConstruction')}</p>
                )
            }
        </Container>
    )
}