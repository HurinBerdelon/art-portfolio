import { Container } from "./style";
import "draft-js/dist/Draft.css";
import { RichTextEditor } from "./RichTextEditor";
import { useState } from "react";
import { UpdateAboutYourself } from "./UpdateAboutYourself";
import { UpdateAboutBusiness } from "./UpdateAboutBusiness";

export function AboutConfigContent(): JSX.Element {

    const [isUpdateAboutYourselfOpen, setIsUpdateAboutYourselfOpen] = useState(false)
    const [isUpdateAboutBusinessOpen, setIsUpdateAboutBusinessOpen] = useState(false)

    return (
        <Container>
            <h3 className="pageTitle">
                In this page you can create and edit the texts that will be shown in portfolio about page.
            </h3>

            <button onClick={() => setIsUpdateAboutYourselfOpen(true)}>
                Open Yourself
            </button>
            <button onClick={() => setIsUpdateAboutBusinessOpen(true)}>
                Open Business
            </button>

            <UpdateAboutYourself
                isOpen={isUpdateAboutYourselfOpen}
                onRequestClose={() => setIsUpdateAboutYourselfOpen(false)}
                prevAboutYourself={'<p>Talk about yourserf...</p>'}
            />
            <UpdateAboutBusiness
                isOpen={isUpdateAboutBusinessOpen}
                onRequestClose={() => setIsUpdateAboutBusinessOpen(false)}
                prevAboutBusiness={'<p>Talk about your products or services...</p>'}
            />

        </Container>
    )
}