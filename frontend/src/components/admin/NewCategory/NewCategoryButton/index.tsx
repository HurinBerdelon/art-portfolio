import { Popover } from '@headlessui/react'
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import { Container } from "./style";

export function NewCategoryButton(): JSX.Element {

    return (
        <Container>
            <Popover.Button>
                <Tooltip title={"Create New Categories"}>
                    <AddIcon />
                </Tooltip>
            </Popover.Button>
        </Container>
    )
}