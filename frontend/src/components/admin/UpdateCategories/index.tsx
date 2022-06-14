import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useCategory } from "../../../hooks/useCategory";
import { Container } from "./style";
import { Popover } from "@headlessui/react";
import { UpdateCategoryForm } from "./UpdateCategoryForm";
import { useEffect } from 'react';

export function UpdateCategories(): JSX.Element {

    const { categories, deleteCategory } = useCategory()

    return (
        <Popover.Panel>
            <Container>
                {categories?.map(category => (
                    <div key={category.id} className="content">
                        <p>{category.title
                            .split('_')
                            .join(' ')
                            // string.capitalize() to each word => string-art => String Art
                            .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                        </p>
                        <div className='buttons'>

                            <Popover>
                                <Popover.Button>
                                    <EditIcon />
                                </Popover.Button>
                                <Popover.Panel>
                                    {({ close: closeEditing }) => (
                                        <UpdateCategoryForm category={category} close={closeEditing} />
                                    )}
                                </Popover.Panel>
                            </Popover>
                            <DeleteIcon
                                onClick={() => deleteCategory(category.id)}
                            />
                        </div>
                    </div>
                )
                )}
            </Container>
        </Popover.Panel>

    )
}