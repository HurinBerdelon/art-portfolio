import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { AdminLinks } from "../../../components/admin/AdminLinks";
import { ListOfCategories } from "../../../components/admin/ListOfCategories";
import { Header } from "../../../components/Header";
import { DesktopHeader } from "../../../components/Header/DesktopHeader";
import { NavBar } from "../../../components/NavBar";
import { useCurrentTheme } from "../../../hooks/useTheme";
import { Container } from "./style";

export default function Categories(): JSX.Element {

    const { currentTheme } = useCurrentTheme()

    return (
        <>
            <Head>
                <title>Admin | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Container>
                    <Header />
                    <DesktopHeader />
                    <NavBar />
                    <div className="contentContainer">
                        <AdminLinks />
                        <ListOfCategories />
                    </div>
                </Container>
            </ThemeProvider>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['admin', 'common'])),
        }
    }
}