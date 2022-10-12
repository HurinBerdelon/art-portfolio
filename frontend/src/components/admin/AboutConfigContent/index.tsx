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
import { useTranslation } from "next-i18next";

export function AboutConfigContent(): JSX.Element {

    const { textContents, setTextContents } = useTextContent()
    const [isUpdateAboutOpen, setIsUpdateAboutModalOpen] = useState(false)
    const [isCreateAboutOpen, setIsCreateAboutModalOpen] = useState(false)
    const [categoryOnUpdate, setCategoryOnUpdate] = useState<'aboutYourself' | 'aboutBusiness'>()
    const [idiomOnUpdate, setIdiomOnUpdate] = useState('')
    const [textContentOnUpdate, setTextContentOnUpdate] = useState<TextContentSchema>()
    const { locales } = useRouter()
    const { t } = useTranslation()

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
                {t('admin:aboutPageContent')}
                <Popover>
                    <Popover.Button>
                        <InfoIcon />
                    </Popover.Button>
                    <Popover.Panel>
                        <p className="pageDescription">
                            {t('admin:aboutInfo')}
                            <br />
                            {t('admin:dateAlert')}
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
                        <td>{t('admin:aboutYourself')}</td>
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
                        <td>{t('admin:aboutBusiness')}</td>
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