import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "../services/apolloClient";
import { ArtSchema } from "../schemas/Art";

interface ArtProviderProps {
    children: ReactNode
}

interface ArtContextProps {
    arts: ArtSchema[]
    setArts(arts: ArtSchema[]): void
    fetchNextArtsPage: (skip: number, take: number) => void
    fetchNextCategoryArtsPage: (category: string, skip: number, take: number) => void
    fetchAllArts: () => void
    count: number,
    setCount: (count: number) => void
}

const ArtContext = createContext<ArtContextProps>(
    {} as ArtContextProps
)

export function ArtProvider({ children }: ArtProviderProps) {

    const [arts, setArts] = useState<ArtSchema[]>()
    const [count, setCount] = useState(0)

    async function fetchAllArts() {
        const { data } = await apolloClient.query({
            query: gql`
                query Arts {
                    arts {
                        id
                        title
                        categoryTitle
                        description
                        image
                        dimension
                        uniqueCode
                        productionDate
                    }
                }
            `
        })
        setArts(data.arts)
    }

    async function fetchNextArtsPage(skip: number, take: number) {
        const newPage = await apolloClient.query({
            query: gql`
            query ArtsPaginated {
                artsPaginated (skip: ${skip}, take: ${take}) {
                    id
                    title
                    categoryTitle
                    description
                    image
                    dimension
                    uniqueCode
                    productionDate
                }
            }
            `
        })
        setArts(prevArts => [...prevArts, ...newPage.data.artsPaginated])
    }

    async function fetchNextCategoryArtsPage(category: string, skip: number, take: number) {
        const newPage = await apolloClient.query({
            query: gql`
            query ArtsByCategory {
                artsByCategory(
                        category: "${String(category).replace('-', '_')}",
                        skip: ${skip},
                        take: ${take}
                    ) {
                        id
                        title
                        categoryTitle
                        description
                        image 
                        dimension
                        uniqueCode
                        productionDate
                    }
                 }
            `
        })
        setArts(prevArts => [...prevArts, ...newPage.data.artsByCategory])
    }

    return (
        <ArtContext.Provider value={{
            arts, setArts, fetchNextArtsPage, fetchNextCategoryArtsPage, fetchAllArts, count,
            setCount
        }}>
            {children}
        </ArtContext.Provider>
    )
}

export function useArts() {
    return useContext(ArtContext)
}

