import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { ArtOrCategory } from "../../../components/admin/ArtOrCategory";
import { ListOfCategories } from "../../../components/admin/ListOfCategories";
import { Header } from "../../../components/Header";
import { useCurrentTheme } from "../../../hooks/useTheme";
import { Container } from "./style";

export default function Categories(): JSX.Element {

    const { currentTheme } = useCurrentTheme()

    return (
        <>
            <Head>
                <title>Admin | FeCardozo Workshop</title>
            </Head>

            <ToastContainer />
            <ThemeProvider theme={currentTheme}>
                <Container>
                    <Header />
                    <ArtOrCategory />
                    <ListOfCategories />
                </Container>
            </ThemeProvider>
        </>
    )
}