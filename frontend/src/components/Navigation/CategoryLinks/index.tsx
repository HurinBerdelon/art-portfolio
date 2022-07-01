import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Container } from "./style";
import Link from "next/link";


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
                        <Link href='#'>
                            <a>Craftmanship</a>
                        </Link>

                        <Link href='#' >
                            <a>Drawing</a>
                        </Link>
                    </span>
                )
                : null
            }
        </Container>
    )
}