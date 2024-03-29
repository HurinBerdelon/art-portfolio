import { useEffect, useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { SearchBar } from "../SearchBar";
import { Container } from "./style";
import { useArts } from "../../../hooks/useArts";
import { ArtSchema } from "../../../schemas/Art";
import { ArtInfo } from "../ArtInfo";
import { CreateArtModal } from "../CreateArtModal";
import { SettingsArtModal } from "../SettingsArtModal";
import { useTranslation } from "next-i18next";
import { useCategory } from "../../../hooks/useCategory";
// import { revalidateSSG } from "../../../services/revalidate";
// import { toastSuccess } from "../../../services/toastProvider";

interface ListOfArtsProps {
    arts: ArtSchema[]
}

export function ListOfArts({ arts }: ListOfArtsProps): JSX.Element {

    const [searchingFor, setSearchingFor] = useState('title')
    const [currentInput, setCurrentInput] = useState('')
    const [isCreateArtModalOpen, setIsCreateArtModalOpen] = useState(false)
    const [isUpdateArtModalOpen, setIsUpdateArtModalOpen] = useState(false)
    const [artBeeingUpdated, setArtBeeingUpdated] = useState<ArtSchema>(null)
    const { categories } = useCategory()
    const { t } = useTranslation()

    const { arts: artState, setArts } = useArts()
    const [artsOnScreen, setArtsOnScreen] = useState<ArtSchema[]>(artState)

    useEffect(() => {
        setArts(arts)
    }, [arts, setArts])


    useEffect(() => {
        setArtsOnScreen(artState)
    }, [artState, setArtsOnScreen])

    useEffect(() => {
        if (artsOnScreen) {
            setArtsOnScreen(arts.filter(art => art[searchingFor].toLowerCase().includes(currentInput.toLowerCase())))
        }
    }, [currentInput, searchingFor, arts])

    // function handleUpdateArtsPage() {
    //     revalidateSSG({ path: '' })
    //     categories.forEach(category => revalidateSSG({ path: category.title }))
    //     toastSuccess(t('admin:artPagesUpdated'))
    // }

    return (
        <Container>
            <CreateArtModal
                isOpen={isCreateArtModalOpen}
                onRequestClose={() => setIsCreateArtModalOpen(false)}
            />

            <SettingsArtModal
                isOpen={isUpdateArtModalOpen}
                onRequestClose={() => setIsUpdateArtModalOpen(false)}
                art={artBeeingUpdated}
            />

            <SearchBar
                searchingFor={searchingFor}
                setSearchingFor={setSearchingFor}
                currentInput={currentInput}
                setCurrentInput={setCurrentInput}
            />

            {/* <button
                className="updateArtsPages"
                onClick={handleUpdateArtsPage}
            >
                {t('admin:updateArtsPages')}
            </button> */}

            <table>
                <thead>
                    <tr>
                        <th className="settings">
                            <button
                                className="buttonAddArt"
                                onClick={() => setIsCreateArtModalOpen(true)}
                            >
                                <AddCircleIcon />
                                <span>{t('admin:addNewArt')}</span>
                            </button>
                        </th>
                        <th>{t('admin:image')}</th>
                        <th>{t('admin:title')}</th>
                        <th>{t('admin:category')}</th>
                    </tr>
                </thead>
                <tbody>
                    {artsOnScreen?.map(art => (
                        <tr key={art.id}>
                            <td className="settings">
                                <SettingsIcon
                                    onClick={() => {
                                        setArtBeeingUpdated(art)
                                        setIsUpdateArtModalOpen(true)
                                    }}
                                />
                            </td>
                            <td>
                                <div className="imageContainer">
                                    <img src={art.image} alt={art.title} />
                                </div>
                            </td>
                            <td>
                                <span className="title">
                                    <ArtInfo art={art} />
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