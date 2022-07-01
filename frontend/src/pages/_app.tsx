import { ApolloProvider } from '@apollo/client'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { CategoryProvider } from '../hooks/useCategory'
import { GlobalStyle } from '../styles/global'
import { apolloClient } from '../services/apolloClient'

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<ApolloProvider client={apolloClient}>
			<CategoryProvider>
				<GlobalStyle />
				<Component {...pageProps} />
			</CategoryProvider>
		</ApolloProvider>
	)
}

export default appWithTranslation(MyApp)
