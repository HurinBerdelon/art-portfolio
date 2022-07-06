import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { AboutContent } from "../components/AboutContent";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useCurrentTheme } from "../hooks/useTheme";

export default function About(): JSX.Element {

    const { currentTheme } = useCurrentTheme()

    return (
        <>
            <Head>
                <title>About | FeCardozo Workshop</title>
            </Head>

            <ThemeProvider theme={currentTheme}>
                <Header />
                <AboutContent />
                <Footer />
            </ThemeProvider>
        </>
    )
}