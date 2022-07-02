import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Container } from "./style";
import { ActiveLink } from "../ActiveLink";


export function CategoryLinks(): JSX.Element {

    const [isShowingCategories, setIsShowingCategories] = useState(false)

    function toggleShowCategories() {
        setIsShowingCategories(!isShowingCategories)
    }

    return (
        <Container>
            <p
                className="categoriesButton"
                onClick={toggleShowCategories}
            >
                {isShowingCategories
                    ? <ArrowDropDownIcon />
                    : <ArrowRightIcon />
                }
                Categories
            </p>

            {isShowingCategories
                ? (
                    <span
                        className="categoriesLink"
                    >
                        <ActiveLink href='#' activeClassName="active" className='effectLinks'>
                            <a>Craftmanship</a>
                        </ActiveLink>

                        <ActiveLink href='#' activeClassName="active" className='effectLinks'>
                            <a>Drawing</a>
                        </ActiveLink>
                    </span>
                )
                : null
            }
        </Container>
    )
}