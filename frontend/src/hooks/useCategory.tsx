import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { CategorySchema } from "../schemas/Category";
import { apolloClient } from "../services/apolloClient";

interface CategoryProviderProps {
    children: ReactNode
}

interface CategoryContextProps {
    categories: CategorySchema[]
    createCategory(title: string): void
    updateCategory(id: string, title: string): void
}

const CategoryContext = createContext<CategoryContextProps>(
    {} as CategoryContextProps
)

export function CategoryProvider({ children }: CategoryProviderProps) {

    const [categories, setCategories] = useState<CategorySchema[]>()

    useEffect(() => {

        apolloClient.query({
            query: gql`
                query GetCategories {
                    getCategories {
                        id
                        title
                        createdAt
                    }
                }
            `
        }).then(data => setCategories(data.data.getCategories))
            .catch(() => setCategories([]))

    }, [createCategory, updateCategory])

    async function createCategory(title: string) {
        await apolloClient.mutate({
            mutation: gql`
                mutation CreateCategory {
                    createCategory(title: "${title}")
                }
            `
        })
    }

    async function updateCategory(id: string, title: string) {
        apolloClient.mutate({
            mutation: gql`
                mutation UpdateCategory($title: String!, $id: String!) {
                    updateCategory(title: "${title}", id: "${id}")
                }
            `
        })
    }

    return (
        <CategoryContext.Provider value={{ categories, createCategory, updateCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategory() {
    return useContext(CategoryContext)
}

