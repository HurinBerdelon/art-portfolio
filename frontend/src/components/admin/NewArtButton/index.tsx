import { Container } from "./style";

interface NewArtButtonProps {
    handleToggleCreateArtModal(): void
}
export function NewArtButton({ handleToggleCreateArtModal }: NewArtButtonProps): JSX.Element {

    return (
        <Container
            type="button"
            onClick={handleToggleCreateArtModal}
        >
            Add New Art
        </Container>
    )
}