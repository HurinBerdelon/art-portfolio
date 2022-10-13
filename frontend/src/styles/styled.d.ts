import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string,

        colors: {
            backgroundOne: string,
            backgroundTwo: string,

            boxOne: string,
            boxTwo: string,

            buttons: string,
            inputBG: string,
            inputPlaceholder: string,

            textOne: string,
            textTwo: string,
            textThree: string,

            black: string,
            white: string,
            gray: string,

            danger: string
        }
    }
}

