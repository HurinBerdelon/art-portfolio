import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { SearchBar } from "../SearchBar";
import { Container } from "./style";
import { useArts } from "../../../hooks/useArts";

export function ListOfArts(): JSX.Element {

    const [searchingFor, setSearchingFor] = useState('title')
    const [currentInput, setCurrentInput] = useState('')

    const { arts } = useArts()

    return (
        <Container>
            <SearchBar
                searchingFor={searchingFor}
                setSearchingFor={setSearchingFor}
                currentInput={currentInput}
                setCurrentInput={setCurrentInput}
            />

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {arts?.map(art => (
                        <tr key={art.id}>
                            <td><EditIcon /></td>
                            <td><DeleteIcon /></td>
                            <td>
                                <div className="imageContainer">
                                    <img src={art.image} alt={art.title} />
                                </div>
                            </td>
                            <td>
                                <span className="title">
                                    <InfoIcon />
                                    {art.title}
                                </span>
                            </td>
                            <td>{art.categoryTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}