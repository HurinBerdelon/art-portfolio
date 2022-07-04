import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const apolloClient = new ApolloClient({
    link: createUploadLink({
        uri: process.env.NEXT_PUBLIC_API_ENDPOINT
    }),
    uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
    cache: new InMemoryCache()
})