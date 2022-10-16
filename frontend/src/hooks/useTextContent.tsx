import { createContext, ReactNode, useContext, useState } from "react";
import { gql } from "@apollo/client";
import { apolloClient } from "../services/apolloClient";
import { toastError, toastSuccess, toastWarn } from "../services/toastProvider";
import { TextContentSchema } from "../schemas/TextContent";
import { useTranslation } from "next-i18next";

interface TextContentProviderProps {
    children: ReactNode
}

interface TextContentContextProps {
    textContents: TextContentSchema[]
    setTextContents: (textContents: TextContentSchema[]) => void
    deleteTextContent(id: string): void
}

const TextContentContext = createContext<TextContentContextProps>(
    {} as TextContentContextProps
)

export function TextContentProvider({ children }: TextContentProviderProps) {

    const [textContents, setTextContents] = useState<TextContentSchema[]>([])
    const { t } = useTranslation()

    async function deleteTextContent(id: string) {
        apolloClient.query({
            query: gql`
                query DeleteTextContent {
                    deleteTextContent (id: "${id}")
                }
            `
        }).then(() => {
            const index = textContents.findIndex(item => item.id === id)
            const tempTextContents = [...textContents]

            tempTextContents.splice(index, 1)

            setTextContents(tempTextContents)
        }).then(() => toastSuccess(t('admin:textDeleted')))
            .catch((error) => {
                toastError(t('admin:unhandledError'))
                console.log(error.message)
            })
    }

    return (
        <TextContentContext.Provider value={{
            textContents,
            setTextContents,
            deleteTextContent
        }}>
            {children}
        </TextContentContext.Provider>
    )
}

export function useTextContent() {
    return useContext(TextContentContext)
}

