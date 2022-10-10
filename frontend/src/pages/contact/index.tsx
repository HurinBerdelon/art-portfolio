import { GetStaticProps } from "next";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { ContactContent } from "../../components/ContactContent";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
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
                <NavBar />
                <ContactContent />
                <Footer />
            </ThemeProvider>
        </>
    )
}

// TODO
export const getStaticProps: GetStaticProps = async () => {

    return {
        props: {}
    }
}