import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from 'yup'
import CheckIcon from '@mui/icons-material/Check';
// import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useCategory } from "../../../hooks/useCategory";
import { Container } from "./style";
import { useState } from "react";
import { Popover } from "@headlessui/react";
import { CategorySchema } from "../../../schemas/Category";

export function UpdateCategories(): JSX.Element {

    const { categories } = useCategory()
    const [categoryOnUpdate, setCategoryOnUpdade] = useState<string>()

    function handleEditClick(category: CategorySchema) {
        setCategoryOnUpdade(category.title)
    }

    return (
        <Popover.Panel>
            {({ close }) => (
                <Container>
                    {categories?.map(category => (
                        <div key={category.id} className="content">
                            <p>🇬🇧</p>
                            <p>{category.title}</p>
                            <Popover>
                                <Popover.Button>
                                    <EditIcon
                                        onClick={() => handleEditClick(category)}
                                    />
                                </Popover.Button>
                                <Popover.Panel>
                                    Open
                                </Popover.Panel>
                            </Popover>
                        </div>
                    )
                    )}
                </Container>
            )}
        </Popover.Panel>

    )
}