import { Popover } from '@headlessui/react'
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import { Container } from "./style";

export function UpdateCategoryButton(): JSX.Element {

    return (
        <Container>
            <Popover.Button>
                <Tooltip title={"Edit Categories"}>
                    <EditIcon />
                </Tooltip>
            </Popover.Button>
        </Container>
    )
}