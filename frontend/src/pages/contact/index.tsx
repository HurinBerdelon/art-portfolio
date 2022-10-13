import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { ContactContent } from "../../components/ContactContent";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { DesktopHeader } from "../../components/Header/DesktopHeader";
import { NavBar } from "../../components/NavBar";
import { useCurrentTheme } from "../../hooks/useTheme";

export default function contact(): JSX.Element {

    const { currentTheme } = useCurrentTheme()

    return (
        <>
            <Head>
                <title>
                    Contact | FeCardozo Workshop
                </title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Header />
                <DesktopHeader />
                <NavBar />
                <ContactContent />
                <Footer />
            </ThemeProvider>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        }
    }
}