import { useState } from "react";
import { SearchBar } from "../../SearchBar";
import { ArtOrCategory } from "../ArtOrCategory";
import { Container } from "./style";

export function ListOfArts(): JSX.Element {

    const [searchingFor, setSearchingFor] = useState('title')
    const [currentInput, setCurrentInput] = useState('')

    return (
        <Container>
            <ArtOrCategory />
            <SearchBar
                searchingFor={searchingFor}
                setSearchingFor={setSearchingFor}
                currentInput={currentInput}
                setCurrentInput={setCurrentInput}
            />
        </Container>
    )
}