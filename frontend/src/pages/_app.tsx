import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { appWithTranslation } from 'next-i18next'
import { createUploadLink } from 'apollo-upload-client'
import { AppProps } from 'next/app'
import { CategoryProvider } from '../hooks/useCategory'
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
			<CategoryProvider>
				<BodyContainer>
					<GlobalStyle />
					<Component {...pageProps} />
				</BodyContainer>
			</CategoryProvider>
		</ApolloProvider>
	)
}

export default appWithTranslation(MyApp)
