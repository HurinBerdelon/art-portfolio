import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { AppProps } from 'next/app'
import { ArtProvider } from '../hooks/useArt'
import { BodyContainer, GlobalStyle } from '../styles/global'

function MyApp({ Component, pageProps }: AppProps) {

	const client = new ApolloClient({
		link: createUploadLink({
			uri: `http://localhost:4000/graphql`
		}),
		cache: new InMemoryCache(),
	})

	return (
		<ApolloProvider client={client}>
			<ArtProvider>
				<BodyContainer>
					<GlobalStyle />
					<Component {...pageProps} />
				</BodyContainer>
			</ArtProvider>
		</ApolloProvider>
	)
}

export default MyApp
