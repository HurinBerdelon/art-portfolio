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
    // saveArt(values: FormikValues): void
    // updateArt(values: FormikValues): void
    // updateArtImage(values: FormikValues): void
    // deleteArt(id: string): void
}

const ArtContext = createContext<ArtContextProps>(
    {} as ArtContextProps
)

export function ArtProvider({ children }: ArtProviderProps) {

    const [arts, setArts] = useState<ArtSchema[]>()

    useEffect(() => {

        apolloClient.query({
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
        }).then(response => setArts(response.data.arts))
            .catch(() => setArts([]))
    }, [])

    return (
        <ArtContext.Provider value={{ arts, setArts }}>
            {children}
        </ArtContext.Provider>
    )
}

export function useArts() {
    return useContext(ArtContext)
}

