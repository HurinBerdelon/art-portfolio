import { Container } from "./style";
import "draft-js/dist/Draft.css";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import { UpdateAbout } from "./UpdateAbout";
import { useRouter } from "next/router";
import { languages } from "../../../config/languages";

export function AboutConfigContent(): JSX.Element {

    const [isUpdateAboutOpen, setIsUpdateAboutModalOpen] = useState(false)
    const [categoryOnUpdate, setCategoryOnUpdate] = useState<'yourself' | 'business'>()
    const [idiomOnUpdate, setIdiomOnUpdate] = useState('')
    const { locales } = useRouter()

    return (
        <Container>
            <h3 className="pageTitle">
                About Page Content
            </h3>
            <p className="pageDescription">
                The about page can have two sections, one to talk about yourself and one to talk about your business.
                Here they are separeted for this sections and for the idioms present on your portfolio.
                The date that appears is the last update date, so you can know if a section is up to date.
            </p>

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
                        {locales.map(locale => (
                            <td
                                key={locale}
                                className='settings'
                            >
                                11/07/2022
                                <SettingsIcon
                                    onClick={() => {
                                        setCategoryOnUpdate('yourself')
                                        setIdiomOnUpdate(locale)
                                        setIsUpdateAboutModalOpen(true)
                                    }}
                                />
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>About Business</td>
                        {locales.map(locale => (
                            <td
                                key={locale}
                                className='settings'
                            >
                                12/07/2022
                                <SettingsIcon
                                    onClick={() => {
                                        setCategoryOnUpdate('business')
                                        setIdiomOnUpdate(locale)
                                        setIsUpdateAboutModalOpen(true)
                                    }}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>


            <UpdateAbout
                isOpen={isUpdateAboutOpen}
                onRequestClose={() => setIsUpdateAboutModalOpen(false)}
                prevContent={'<p>Talk about yourserf...</p>'}
                category={categoryOnUpdate}
                idiom={idiomOnUpdate}
            />
        </Container>
    )
}