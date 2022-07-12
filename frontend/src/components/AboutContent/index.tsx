import { useRouter } from "next/router";
import ReactHtmlParser from 'react-html-parser'
import { TextContentSchema } from "../../schemas/TextContent";
import { Container } from "./style";

interface AboutContentProps {
    aboutContent: TextContentSchema[]
}

export function AboutContent({ aboutContent }: AboutContentProps): JSX.Element {

    const { locale } = useRouter()

    const aboutYourself = {
        image: aboutContent.find(item => item.type === 'aboutYourself' && item.idiom === locale)?.imageUrl,
        text: aboutContent.find(item => item.type === 'aboutYourself' && item.idiom === locale)?.text
    }

    const aboutBusiness = {
        image: aboutContent.find(item => item.type === 'aboutBusiness' && item.idiom === locale)?.imageUrl,
        text: aboutContent.find(item => item.type === 'aboutBusiness' && item.idiom === locale)?.text
    }

    // TODO
    return (
        <Container>
            <h1>About</h1>

            {aboutYourself.text
                ? (<>
                    <div className="imageContainer">
                        <img src={aboutYourself.image} alt='About Yourself' />
                    </div>

                    {ReactHtmlParser(aboutYourself.text)}
                </>)
                : (
                    <p>Section under construction</p>
                )
            }

            {aboutBusiness.text
                ? (<>
                    <div className="imageContainer">
                        <img src={aboutBusiness.image} alt="About Products or Services" />
                    </div>

                    {ReactHtmlParser(aboutBusiness.text)}
                </>)
                : (
                    <p>Section under construction</p>
                )
            }
        </Container>
    )
}