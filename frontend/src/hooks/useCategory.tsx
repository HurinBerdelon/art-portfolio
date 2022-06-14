import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { CategorySchema } from "../schemas/Category";
import { apolloClient } from "../services/apolloClient";

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

    let tempCategories: CategorySchema[]

    useEffect(() => {
        tempCategories = structuredClone(categories)
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
        }).then(data => setCategories(data.data.getCategories))
            .catch(() => setCategories([]))
    }, [])

    async function createCategory(title: string) {
        const { data } = await apolloClient.mutate({
            mutation: gql`
                mutation CreateCategory {
                    createCategory(title: "${title}") {
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
        })

        setCategories(prevCategories => [...prevCategories, data.createCategory])
    }

    async function updateCategory(id: string, title: string) {
        const { data } = await apolloClient.mutate({
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
        })

        const index = categories.findIndex(item => item.id === id)
        const tempCategories = [...categories]

        tempCategories.splice(index, 1, data.updateCategory)

        setCategories(tempCategories)
    }

    async function updateTranslation({ title, id, categoryTitle, language }: UpdateTranslationProps) {
        const { data } = await apolloClient.mutate({
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
        })

        const category = tempCategories.find(item => item.title === data.updateTranslation.categoryTitle)
        const index = category?.Translations.findIndex(item => item.id === data.updateTranslation.id)
        delete data.updateTranslation.categoryTitle

        if (index >= 0) {
            category.Translations.splice(index, 1, data.updateTranslation)
            setCategories(tempCategories)
        } else {
            category.Translations.push(data.updateTranslation)
            setCategories(tempCategories)
        }
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
        }).catch(error => console.log(error.message))


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

