import { Field, FormikErrors } from "formik";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useCategory } from "../../../../hooks/useCategory";
import { Container } from "./style";
import SyncIcon from '@mui/icons-material/Sync';

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
    isLoading: boolean
    setFieldValue(field: string, value: any): void
    initialValues: any
}

export function InputZone({ errors, setFieldValue, initialValues, isLoading }: InputArtProps): JSX.Element {

    const { categories } = useCategory()
    const { t } = useTranslation()

    return (
        <Container>
            <Field
                type="text"
                name='title'
                placeholder={errors.title ? errors.title : t('admin:title')}
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
                    {errors.categoryTitle ? errors.categoryTitle : t('admin:category')}
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
                placeholder={errors.uniqueCode ? errors.uniqueCode : t('admin:uniqueCode')}
                className={errors.uniqueCode ? 'errorMessage' : ''}
            />
            <Field
                as='textarea'
                name='description'
                placeholder={errors.description ? errors.description : t('admin:description')}
                className={errors.description ? 'errorMessage' : ''}
            />
            <Field
                type="text"
                name='dimension'
                placeholder={errors.dimension ? errors.dimension : t('admin:dimension')}
                className={errors.dimension ? 'errorMessage' : ''}
            />
            <Field
                type="date"
                name='productionDate'
                placeholder={errors.productionDate ? errors.productionDate : t('admin:productionDate')}
                className={errors.productionDate ? 'errorMessage' : ''}
            />

            <button
                className='buttonSubmit'
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? <SyncIcon className="loading" /> : t('admin:save')}
            </button>
        </Container>
    )
}