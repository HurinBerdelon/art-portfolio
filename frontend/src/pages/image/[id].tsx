import { gql } from "@apollo/client"
import dayjs from "dayjs"
import { GetServerSideProps } from "next"
import { LinkToPages } from "../../components/NavBar/LinkToPages"
import { ShareButton } from "../../components/ShareButtons"
import { ArtSchema } from "../../schemas/Art"
import { apolloClient } from "../../services/apolloClient"
import { Container } from "./style"

interface SinglePictureProps {
    art: ArtSchema
}

export default function SinglePicture({ art }: SinglePictureProps): JSX.Element {

    return (
        <Container>
            <div className="dropdown">
                <button className="dropbtn">
                    <h1>HurinBerdelon</h1>
                </button>
                <div className="dropContent">
                    <LinkToPages />
                </div>
            </div>
            <section className="imageContainer">
                <img src={art.image} alt={art.title} />
            </section>

            <section className="infoContainer">
                <div className="infos">

                    <h2>{art.title}</h2>
                    <p className='dateInfo'>{dayjs(art.productionDate).format('MMMM [of] YYYY')}</p>
                    <p className="dimensionInfo">{art.dimension}</p>
                    <p className='descriptionInfo'>{art.description}</p>
                </div>

                <div className="shareMedia">
                    <ShareButton currentPictureId={art.id} />
                </div>
            </section>
        </Container>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.params

    const { data } = await apolloClient.query({
        query: gql`
            query ArtById {
                artById(id: "${id}") {
                    id
                    title
                    description
                    image
                    dimension
                    uniqueCode
                    productionDate
                    createdAt
                    updatedAt
                }
            }
        `})


    return {
        props: {
            art: data.artById
        }
    }
}