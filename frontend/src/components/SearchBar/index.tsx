import { Listbox } from "@headlessui/react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Container } from "./style";

interface SearchBarProps {
    searchingFor: string
    setSearchingFor: (searchingFor: string) => void
    currentInput: string
    setCurrentInput: (currentInput: string) => void
}

const SEARCH_OPTIONS = ['title', 'category']

export function SearchBar({
    searchingFor,
    setCurrentInput,
    setSearchingFor
}: SearchBarProps): JSX.Element {

    return (
        <Container>
            <Listbox value={searchingFor} onChange={setSearchingFor}>
                <Listbox.Button>
                    {searchingFor}
                    <ArrowDropDownIcon />
                </Listbox.Button>
                <Listbox.Options className='options'>
                    {SEARCH_OPTIONS.map(option => (
                        <Listbox.Option
                            key={option}
                            value={option}
                        >
                            {({ selected }) => (
                                selected
                                    ? (<span>
                                        <CheckBoxIcon />
                                        {option}
                                    </span>
                                    )
                                    : (<span>
                                        <CheckBoxOutlineBlankIcon />
                                        {option}
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