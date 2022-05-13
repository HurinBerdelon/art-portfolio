import { useRouter } from "next/router"

interface SinglePictureParams {
    id: number
    name: string
    order: number
}

export default function SinglePicture(picture: SinglePictureParams): JSX.Element {

    const router = useRouter()

    const { id } = router.query

    return (
        <>
            <h1>{id}</h1>
        </>
    )
}