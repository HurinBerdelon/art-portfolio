import { Container } from "./style";
import "draft-js/dist/Draft.css";
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircle from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { languages } from "../../../config/languages";
import { Popover } from "@headlessui/react";
import { apolloClient } from "../../../services/apolloClient";
import { gql } from "@apollo/client";
import { useTextContent } from "../../../hooks/useTextContent";
import dayjs from "dayjs";
import { TextContentSchema } from "../../../schemas/TextContent";
import { CreateAbout } from "./CreateAbout";
import { SettingsAbout } from "./SettingsAbout";

export function AboutConfigContent(): JSX.Element {

    const { textContents, setTextContents } = useTextContent()
    const [isUpdateAboutOpen, setIsUpdateAboutModalOpen] = useState(false)
    const [isCreateAboutOpen, setIsCreateAboutModalOpen] = useState(false)
    const [categoryOnUpdate, setCategoryOnUpdate] = useState<'aboutYourself' | 'aboutBusiness'>()
    const [idiomOnUpdate, setIdiomOnUpdate] = useState('')
    const [textContentOnUpdate, setTextContentOnUpdate] = useState<TextContentSchema>()
    const { locales } = useRouter()

    useEffect(() => {
        apolloClient.query({
            query: gql`
                query GetTextContentsByPage {
                    getTextContentsByPage(page: "about") {
                        id
                        type
                        text
                        idiom
                        imageUrl
                        updatedAt
                    }
                }
            `
        }).then(response => setTextContents(response.data.getTextContentsByPage))
            .catch(() => setTextContents([]))
    }, [])

    return (
        <Container>
            <h3 className="pageTitle">
                About Page Content
                <Popover>
                    <Popover.Button>
                        <InfoIcon />
                    </Popover.Button>
                    <Popover.Panel>
                        <p className="pageDescription">
                            The about page can has two sections, one to talk about yourself and one to talk about your business.
                            Here they are separeted for this sections and for the idioms present on your portfolio.<br />
                            * The date that appears is the last update date, so you can know if a section is up to date.
                        </p>
                    </Popover.Panel>
                </Popover>
            </h3>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        {locales.map(locale => (
                            <th className='title' key={locale}>{languages[locale].flag}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>About Yourself</td>
                        {locales.map(locale => {
                            const textContent = textContents
                                .find(item => item.idiom === locale && item.type === 'aboutYourself')

                            if (!textContent) {
                                return (
                                    <td
                                        key={locale}
                                        className='settings'
                                    >
                                        <AddCircle
                                            onClick={() => {
                                                setIdiomOnUpdate(locale)
                                                setCategoryOnUpdate('aboutYourself')
                                                setIsCreateAboutModalOpen(true)
                                            }}
                                        />
                                    </td>
                                )
                            }
                            return (
                                <td
                                    key={locale}
                                    className='settings'
                                >
                                    {dayjs(textContent.updatedAt).format('DD/MM/YYYY')}
                                    <SettingsIcon
                                        onClick={() => {
                                            setTextContentOnUpdate(textContent)
                                            setIsUpdateAboutModalOpen(true)
                                        }}
                                    />
                                </td>
                            )
                        })}
                    </tr>
                    <tr>
                        <td>About Business</td>
                        {locales.map(locale => {

                            const textContent = textContents
                                .find(item => item.idiom === locale && item.type === 'aboutBusiness')

                            if (!textContent) {
                                return (
                                    <td
                                        key={locale}
                                        className='settings'
                                    >
                                        <AddCircle
                                            onClick={() => {
                                                setIdiomOnUpdate(locale)
                                                setCategoryOnUpdate('aboutBusiness')
                                                setIsCreateAboutModalOpen(true)
                                            }}
                                        />
                                    </td>
                                )
                            }
                            return (
                                <td
                                    key={locale}
                                    className='settings'
                                >
                                    {dayjs(textContent.updatedAt).format('DD/MM/YYYY')}
                                    <SettingsIcon
                                        onClick={() => {
                                            setTextContentOnUpdate(textContent)
                                            setIsUpdateAboutModalOpen(true)
                                        }}
                                    />
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>


            <SettingsAbout
                isOpen={isUpdateAboutOpen}
                onRequestClose={() => setIsUpdateAboutModalOpen(false)}
                textContentOnUpdate={textContentOnUpdate}
            />

            <CreateAbout
                isOpen={isCreateAboutOpen}
                onRequestClose={() => setIsCreateAboutModalOpen(false)}
                category={categoryOnUpdate}
                idiom={idiomOnUpdate}
            />
        </Container>
    )
}