import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { AdminLinks } from "../../../components/admin/AdminLinks";
import { ListOfCategories } from "../../../components/admin/ListOfCategories";
import { Header } from "../../../components/Header";
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