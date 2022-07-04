import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { SearchBar } from "../SearchBar";
import { Container } from "./style";
import { useArts } from "../../../hooks/useArts";
import { ArtSchema } from "../../../schemas/Art";

export function ListOfArts(): JSX.Element {

    const [searchingFor, setSearchingFor] = useState('title')
    const [currentInput, setCurrentInput] = useState('')

    const { arts } = useArts()

    const [artsOnScreen, setArtsOnScreen] = useState<ArtSchema[]>()

    useEffect(() => {
        setArtsOnScreen(arts)
    }, [arts])

    useEffect(() => {
        if (artsOnScreen) {
            setArtsOnScreen(arts.filter(art => art[searchingFor].toLowerCase().includes(currentInput.toLowerCase())))
        }
    }, [currentInput, searchingFor])

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
                        <th className="settings">
                            <AddCircleIcon />
                        </th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {artsOnScreen?.map(art => (
                        <tr key={art.id}>
                            <td className="settings"><SettingsIcon /></td>
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