import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string,

        colors: {
            backgroundOne: string,
            backgroundTwo: string,

            boxOne: string,
            boxTwo: string,

            textOne: string,
            textTwo: string,

            black: string,
            white: string,
            gray: string,
        }
    }
}