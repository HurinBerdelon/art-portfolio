import { Listbox } from "@headlessui/react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Container } from "./style";
import { useEffect } from "react";

interface SearchBarProps {
    searchingFor: string
    setSearchingFor: (searchingFor: string) => void
    currentInput: string
    setCurrentInput: (currentInput: string) => void
}

const SEARCH_OPTIONS = [
    { key: 'title', name: 'Title' },
    { key: 'categoryTitle', name: 'Category' }
]

export function SearchBar({
    searchingFor,
    setCurrentInput,
    setSearchingFor
}: SearchBarProps): JSX.Element {

    const currentSearch = SEARCH_OPTIONS.find(item => item.key === searchingFor)

    return (
        <Container>
            <Listbox value={searchingFor} onChange={setSearchingFor}>
                <Listbox.Button>
                    {currentSearch.name}
                    <ArrowDropDownIcon />
                </Listbox.Button>
                <Listbox.Options className='options'>
                    {SEARCH_OPTIONS.map(option => (
                        <Listbox.Option
                            key={option.key}
                            value={option.key}
                        >
                            {({ selected }) => (
                                selected
                                    ? (<span>
                                        <CheckBoxIcon />
                                        {option.name}
                                    </span>
                                    )
                                    : (<span>
                                        <CheckBoxOutlineBlankIcon />
                                        {option.name}
                                    </span>
                                    )
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>

            <label htmlFor="searchBar"></label>
            <input type="text" id='searchBar' onChange={(event) => setCurrentInput(event.target.value)} />

            <SearchIcon />
        </Container>
    )
}