import { ThemeProvider } from "styled-components";
import { Header } from "../components/Header";
import light from '../styles/themes/light'

export default function Home(): JSX.Element {

    return (
        <ThemeProvider theme={light}>
            <Header />
            Presentation
            Gallery
        </ThemeProvider>
    )
}