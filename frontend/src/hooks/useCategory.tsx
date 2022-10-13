import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { CategorySchema } from "../schemas/Category";
import { apolloClient } from "../services/apolloClient";
import { toastError, toastSuccess, toastWarn } from "../services/toastProvider";

interface UpdateTranslationProps {
    title: string,
    id?: string,
    categoryTitle?: string,
    language?: string
}

interface CategoryProviderProps {
    children: ReactNode
}

interface CategoryContextProps {
    categories: CategorySchema[]
    createCategory(title: string): void
    updateCategory(id: string, title: string): void
    updateTranslation({ title, id, categoryTitle, language }: UpdateTranslationProps): void
    deleteCategory(id: string): void
}

const CategoryContext = createContext<CategoryContextProps>(
    {} as CategoryContextProps
)

export function CategoryProvider({ children }: CategoryProviderProps) {

    const [categories, setCategories] = useState<CategorySchema[]>()

    let tempCategories: CategorySchema[] = []

    useEffect(() => {
        categories?.map(category => {
            const tempCategory = {
                id: category.id,
                title: category.title,
                Translations: [...category.Translations]
            }
            tempCategories.push(tempCategory)
        })
    }, [categories])

    useEffect(() => {

        apolloClient.query({
            query: gql`
                query GetCategories {
                    getCategories {
                        id
                        title
                        createdAt
                        Translations {
                            id
                            title
                            language
                        }
                    }
                }
            `
        }).then(response => setCategories(response.data.getCategories))
            .catch(() => setCategories([]))
    }, [])

    async function createCategory(title: string) {
        apolloClient.mutate({
            mutation: gql`
                mutation CreateCategory {
                    createCategory (title: "${title}") {
                        id
                        title
                        createdAt
                        Translations {
                            id
                            title
                            language
                        }
                    }
                }
            `
        }).then(response => {
            setCategories(prevCategories => [...prevCategories, response.data.createCategory])
            toastSuccess(`Category ${title} created!`)
        }).catch(() => toastError(`Category ${title} already exists!`))


    }

    async function updateCategory(id: string, title: string) {
        apolloClient.mutate({
            mutation: gql`
                mutation UpdateCategory {
                    updateCategory(title: "${title}", id: "${id}") {
                        id
                        title
                        createdAt
                        Translations {
                            id
                            title
                            language
                        }
                    }
                }
            `
        }).then(response => {
            const index = categories.findIndex(item => item.id === id)
            const tempCategories = [...categories]

            tempCategories.splice(index, 1, response.data.updateCategory)

            setCategories(tempCategories)
            toastSuccess(`Category ${title} was updated!`)
        }).catch(error => toastWarn(`Unhandled error with message: ${error.message}! Please, contact the developer`))
    }

    async function updateTranslation({ title, id, categoryTitle, language }: UpdateTranslationProps) {
        await apolloClient.mutate({
            mutation: gql`
                mutation UpdateTranslation {
                    updateTranslation(
                        id: "${id}",
                        title: "${title}",
                        categoryTitle: "${categoryTitle}",
                        language: "${language}"
                    ) {
                        id
                        title
                        categoryTitle
                        language
                    }
                }
            `
        }).then(response => {
            const category = tempCategories.find(item => item.title === response.data.updateTranslation.categoryTitle)
            const index = category?.Translations.findIndex(item => item.id === response.data.updateTranslation.id)
            delete response.data.updateTranslation.categoryTitle

            if (index >= 0) {
                console.log('adding now')
                category.Translations.splice(index, 1, response.data.updateTranslation)
                setCategories(tempCategories)
            } else {
                category.Translations.push(response.data.updateTranslation)
                setCategories(tempCategories)
            }
            toastSuccess(`Translation ${title} was updated!`)
        }).catch(error => toastWarn(`Unhandled error with message: ${error.message}! Please, contact the developer`))
    }

    async function deleteCategory(id: string) {
        apolloClient.query({
            query: gql`
                query DeleteCategory {
                    deleteCategory (id: "${id}")
                }
            `
        }).then(() => {
            const index = categories.findIndex(item => item.id === id)
            const tempCategories = [...categories]

            tempCategories.splice(index, 1)

            setCategories(tempCategories)
        }).then(() => toastSuccess(`Category deleted`))
            .catch(() => toastError(`There are arts registered in this category, please delete them before delete the category`))
    }

    return (
        <CategoryContext.Provider value={{ categories, createCategory, updateCategory, updateTranslation, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategory() {
    return useContext(CategoryContext)
}

