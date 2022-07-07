import { Container } from "./style";
import "draft-js/dist/Draft.css";
import { RichTextEditor } from "./RichTextEditor";

export function AboutConfigContent(): JSX.Element {

    return (
        <Container>
            <h3 className="pageTitle">
                In this page you can create and edit the texts that you be shown in portfolio about page
            </h3>
            <RichTextEditor prevContent={'<p>Talk about yourserf...</p>'} />
            <RichTextEditor prevContent={'<p>Talk about your products or services...</p>'} />
        </Container>
    )
}