import { ApolloProvider } from '@apollo/client'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { CategoryProvider } from '../hooks/useCategory'
import { GlobalStyle } from '../styles/global'
import { apolloClient } from '../services/apolloClient'
import { SessionProvider } from 'next-auth/react'
import { CurrentThemeProvider } from '../hooks/useTheme'
import { TextContentProvider } from '../hooks/useTextContent'
import { ToastContainer } from 'react-toastify'
import { ArtProvider } from '../hooks/useArts'

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<ApolloProvider client={apolloClient}>
			<ToastContainer />
			<CurrentThemeProvider>
				<SessionProvider>
					<ArtProvider>
						<CategoryProvider>
							<TextContentProvider>
								<GlobalStyle />
								<Component {...pageProps} />
							</TextContentProvider>
						</CategoryProvider>
					</ArtProvider>
				</SessionProvider>
			</CurrentThemeProvider>
		</ApolloProvider>
	)
}

export default appWithTranslation(MyApp)
