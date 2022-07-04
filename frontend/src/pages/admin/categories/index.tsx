import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { ArtOrCategory } from "../../../components/admin/ArtOrCategory";
import { ListOfCategories } from "../../../components/admin/ListOfCategories";
import { Header } from "../../../components/Header";
import light from "../../../styles/themes/light";
import { Container } from "./style";

export default function Categories(): JSX.Element {

    return (
        <>
            <Head>
                <title>Admin | HurinBerdelon</title>
            </Head>

            <ToastContainer />
            <ThemeProvider theme={light}>
                <Container>
                    <Header />
                    <ArtOrCategory />
                    <ListOfCategories />
                </Container>
            </ThemeProvider>
        </>
    )
}