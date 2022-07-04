import { Field, FormikErrors } from "formik";
import { useCategory } from "../../../../hooks/useCategory";
import { Container } from "./style";

interface ErrorProps {
    title?: string;
    uniqueCode?: string;
    categoryTitle?: string;
    file?: string | undefined;
    description?: string;
    dimension?: string;
    productionDate?: string | FormikErrors<Date>;
}

interface InputArtProps {
    errors: ErrorProps
    setFieldValue(field: string, value: any): void
    initialValues: any
}

export function InputZone({ errors, setFieldValue, initialValues }: InputArtProps): JSX.Element {

    const { categories } = useCategory()

    return (
        <Container>
            <Field
                type="text"
                name='title'
                placeholder={errors.title ? errors.title : "Title"}
                className={errors.title ? 'errorMessage' : ''}
            />

            <select
                onChange={(event) => setFieldValue('categoryTitle', event.target.value)}
                defaultValue={initialValues.categoryTitle ? initialValues.categoryTitle : 'default'}
                className={errors.categoryTitle ? 'errorMessage' : ''}
            >
                <option
                    disabled
                    value="default">
                    {errors.categoryTitle ? errors.categoryTitle : "Category"}
                </option>
                {categories.map(category => (
                    <option
                        value={category.title}
                        key={category.id}
                    >
                        {category.title
                            .replace('_', ' ')
                            // string.capitalize() to each word => string-art => String Art
                            .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                    </option>
                ))}
            </select>
            <Field
                type="text"
                name='uniqueCode'
                placeholder={errors.uniqueCode ? errors.uniqueCode : "Unique Code"}
                className={errors.uniqueCode ? 'errorMessage' : ''}
            />
            <Field
                as='textarea'
                name='description'
                placeholder={errors.description ? errors.description : "Description"}
                className={errors.description ? 'errorMessage' : ''}
            />
            <Field
                type="text"
                name='dimension'
                placeholder={errors.dimension ? errors.dimension : "Dimension"}
                className={errors.dimension ? 'errorMessage' : ''}
            />
            <Field
                type="date"
                name='productionDate'
                placeholder={errors.productionDate ? errors.productionDate : "Production Date"}
                className={errors.productionDate ? 'errorMessage' : ''}
            />

            <button className='buttonSubmit' type="submit">Save</button>
        </Container>
    )
}