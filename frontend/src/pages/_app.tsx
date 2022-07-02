import { ApolloProvider } from '@apollo/client'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { CategoryProvider } from '../hooks/useCategory'
import { GlobalStyle } from '../styles/global'
import { apolloClient } from '../services/apolloClient'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<ApolloProvider client={apolloClient}>
			<SessionProvider>
				<CategoryProvider>
					<GlobalStyle />
					<Component {...pageProps} />
				</CategoryProvider>
			</SessionProvider>
		</ApolloProvider>
	)
}

export default appWithTranslation(MyApp)
