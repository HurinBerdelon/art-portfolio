import { gql } from "@apollo/client";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { apolloClient } from "../../../services/apolloClient";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                const { data } = await apolloClient.query({
                    query: gql`
                        query GetUser {
                            getUser {
                                id
                                username
                                password
                            }
                        }
                    `
                })

                const user = data.getUser[0]

                if (credentials.username === user.username && await compare(credentials.password, user.password)) {
                    // Login succeed
                    return {
                        name: user.username,
                        id: user.id
                    }
                }

                // Login failed
                return null
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id
            }

            return token
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id as string
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
    }
})